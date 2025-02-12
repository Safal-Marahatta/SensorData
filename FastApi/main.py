# Note: In a production system you should:

# Use a real database.
# Hash passwords securely (for example with PassLib’s bcrypt, rather than a “fake” hash).
# Securely generate and store your secret key.
# Consider using OAuth2 properly (with secure token storage and refresh tokens, etc).


from datetime import datetime, timedelta
from typing import Optional, Dict

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from pydantic import BaseModel
import models

#----cors Header-----
from fastapi.middleware.cors import CORSMiddleware

####################################this is for creating the database that is defined in the models.py
from database import engine, SessionLocal
import models

# Create all database tables
models.Base.metadata.create_all(bind=engine)

######################################################################################################

app = FastAPI()

# Define the origins that are allowed to access your backend
origins = [
    "http://localhost:5173",  # your React app's URL
    # add other origins if needed, e.g., "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # Allowed origins
    allow_credentials=True,
    allow_methods=["*"],             # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],             # Allow all headers
)




# -- Configuration --

SECRET_KEY = "your_secret_key_here"  # Change this to a strong secret in production!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# -- Fake Database --

# We create a fake database with two users: one regular user and one admin.
fake_users_db: Dict[str, Dict] = {
    "user": {
        "username": "user",
        "hashed_password": "fakehasheduser",  # in production, use a real hash!
        "role": "user",
    },
    "admin": {
        "username": "admin",
        "hashed_password": "fakehashedadmin",  # in production, use a real hash!
        "role": "admin",
    },
}

# -- Pydantic Models --

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None

class User(BaseModel):
    username: str
    role: str

class UserInDB(User):
    hashed_password: str

# -- Utility Functions --

def fake_hash_password(password: str) -> str:
    """
    A fake password hashing function.
    In production, use a secure hash like bcrypt.
    """
    return "fakehashed" + password

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify the provided password against the stored (fake) hashed password.
    """
    return fake_hash_password(plain_password) == hashed_password

def get_user(db, username: str) -> Optional[UserInDB]:
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)
    return None

def authenticate_user(db, username: str, password: str) -> Optional[UserInDB]:
    user = get_user(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a JWT token with an expiration time.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# -- FastAPI Application Setup --


# This will look for a bearer token in the Authorization header.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# -- Authentication Endpoints --

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    This endpoint receives form data (username and password), authenticates the user,
    and returns a JWT access token if successful.
    """
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # The token contains the subject (username) and the user's role.
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role},
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}

# -- Dependency to Get Current User from Token --

async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserInDB:
    """
    Decode the JWT token and retrieve the corresponding user.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: Optional[str] = payload.get("sub")
        role: Optional[str] = payload.get("role")
        if username is None or role is None:
            raise credentials_exception
        token_data = TokenData(username=username, role=role)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)) -> UserInDB:
    """
    In a real application, you might check if the user is active.
    Here, we assume that if the token is valid, the user is active.
    """
    return current_user

# -- Protected Endpoints --

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: UserInDB = Depends(get_current_active_user)):
    """
    An endpoint to get the current user's information.
    Accessible by both regular users and admins.
    """
    return User(username=current_user.username, role=current_user.role)

def admin_required(current_user: UserInDB = Depends(get_current_active_user)) -> UserInDB:
    """
    Dependency that checks if the current user is an admin.
    """
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user

@app.get("/admin", response_model=User)
async def read_admin_data(current_user: UserInDB = Depends(admin_required)):
    """
    An endpoint that only admin users can access.
    """
    return User(username=current_user.username, role=current_user.role)

# -- Optional: User Signup Endpoint --

@app.post("/signup", response_model=User)
async def create_user(username: str, password: str, role: str = "user"):
    """
    A simple endpoint to create a new user.
    By default, new users get the "user" role; to create an admin,
    you can set role="admin" (but in production, restrict admin creation).
    """
    if username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_password = fake_hash_password(password)
    fake_users_db[username] = {
        "username": username,
        "hashed_password": hashed_password,
        "role": role,
    }
    return User(username=username, role=role)
##########################################################################################################################################################
##########################################################################################################################################################

from datetime import datetime, timedelta
import random


# Define the data model for a sensor reading.
class SensorReading(BaseModel):
    value: float
    sensorid: int
    timestamp: str

@app.get("/sensor-data")
def get_sensor_data(current_user: UserInDB = Depends(get_current_active_user)):
    sensors = {}
    # For sensor IDs 1 through 7
    for sensor_id in range(1, 8):
        readings = []
        now = datetime.utcnow()  # Using UTC for timestamps
        # Generate 100 readings per sensor.
        for i in range(100):
            # For a historical feel, spread timestamps over the last 50 seconds.
            reading_time = now - timedelta(seconds=50 - i)
            reading = SensorReading(
                value=random.uniform(50, 52),  # Random value between 0 and 100
                sensorid=sensor_id,
                timestamp=reading_time.isoformat() + "Z"  # Append "Z" to indicate UTC
            )
            readings.append(reading.dict())
        sensors[sensor_id] = readings
    return sensors





# ===============================
# NEW: Settings endpoints
# ===============================

from typing import List
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
# (If not already imported, add:)
from fastapi import Depends

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models for incoming settings data from the frontend

class GeneralSettingsInput(BaseModel):
    station_id: int
    station_name: str
    server_address: str
    com_port: str
    baud_rate: int
    byte_size: int
    parity: str
    stopbit: int
    poll_interval: int
    poll_delay: int
    log_interval: int

class SensorSettingInput(BaseModel):
    sensor_id: int
    function_code: str
    register_address: int
    register_count: int
    variable: str
    multiplier: float
    offset: float
    parameter_name: str
    unit: str
    upper_threshold: float
    lower_threshold: float

class AlertSettingInput(BaseModel):
    name: str
    designation: str
    mobile_number: str
    email: EmailStr
    alert_type: List[str]  # e.g. ["sms", "email"]

# ----------------------------------
# Endpoint: Save General Settings
# ----------------------------------
@app.post("/api/general-settings")
async def save_general_settings(
    settings: GeneralSettingsInput,
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_active_user)
):
    """
    Create or update the general settings.
    """
    # For simplicity we assume there is only one general settings record.
    general_setting = db.query(models.GeneralSetting).first()
    if general_setting:
        # Update existing record
        general_setting.station_id = settings.station_id
        general_setting.station_name = settings.station_name
        general_setting.server_address = settings.server_address
        general_setting.com_port = settings.com_port
        general_setting.baud_rate = settings.baud_rate
        general_setting.byte_size = settings.byte_size
        general_setting.parity = settings.parity
        general_setting.stopbit = settings.stopbit
        general_setting.poll_interval = settings.poll_interval
        general_setting.poll_delay = settings.poll_delay
        general_setting.log_interval = settings.log_interval
    else:
        # Create new record
        general_setting = models.GeneralSetting(
            station_id=settings.station_id,
            station_name=settings.station_name,
            server_address=settings.server_address,
            com_port=settings.com_port,
            baud_rate=settings.baud_rate,
            byte_size=settings.byte_size,
            parity=settings.parity,
            stopbit=settings.stopbit,
            poll_interval=settings.poll_interval,
            poll_delay=settings.poll_delay,
            log_interval=settings.log_interval
        )
        db.add(general_setting)
    db.commit()
    db.refresh(general_setting)
    return {
        "message": "General settings saved successfully",
        "settings": {
            "station_id": general_setting.station_id,
            "station_name": general_setting.station_name,
            "server_address": general_setting.server_address,
            "com_port": general_setting.com_port,
            "baud_rate": general_setting.baud_rate,
            "byte_size": general_setting.byte_size,
            "parity": general_setting.parity,
            "stopbit": general_setting.stopbit,
            "poll_interval": general_setting.poll_interval,
            "poll_delay": general_setting.poll_delay,
            "log_interval": general_setting.log_interval,
            "installed_date": str(general_setting.installed_date)
        }
    }

# ----------------------------------
# Endpoint: Save Sensor Settings
# ----------------------------------
@app.post("/api/sensor-settings")
async def save_sensor_settings(
    sensor_settings: List[SensorSettingInput],
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_active_user)
):
    """
    Save sensor settings by creating (or updating) sensor, sensor parameter, and modbus setting records.
    """
    results = []
    for sensor in sensor_settings:
        # Look up the sensor by sensor_id; if not found, create one.
        existing_sensor = db.query(models.Sensor).filter(models.Sensor.sensor_id == sensor.sensor_id).first()
        if not existing_sensor:
            # NOTE: In this example, we assign a default station_id of 1.
            new_sensor = models.Sensor(
                sensor_id=sensor.sensor_id,
                sensor_name=sensor.parameter_name,  # using parameter name as sensor name
                sensor_location="",
                station_id=1
            )
            db.add(new_sensor)
            db.commit()
            db.refresh(new_sensor)
            existing_sensor = new_sensor

        # Create a SensorParameter record.
        # Here we use the function_code as the parameter_code.
        sensor_parameter = models.SensorParameter(
            sensor_id=existing_sensor.sensor_id,
            parameter_code=sensor.function_code,
            parameter_name=sensor.parameter_name,
            unit=sensor.unit,
            upper_threshold=sensor.upper_threshold,
            lower_threshold=sensor.lower_threshold,
            logging_interval=60  # default logging interval; you could also use general settings here
        )
        db.add(sensor_parameter)
        db.commit()
        db.refresh(sensor_parameter)

        # Create a ModbusSetting record.
        modbus_setting = models.ModbusSetting(
            sensor_parameter_id=sensor_parameter.id,
            slave_id=sensor.sensor_id,  # using sensor id as the slave id
            function_code=sensor.function_code,
            register_address=sensor.register_address,
            register_count=sensor.register_count,
            variable=sensor.variable,
            multiplier=sensor.multiplier,
            offset=sensor.offset
        )
        db.add(modbus_setting)
        db.commit()
        db.refresh(modbus_setting)

        results.append({
            "sensor_id": sensor.sensor_id,
            "sensor_parameter_id": sensor_parameter.id,
            "modbus_setting_id": modbus_setting.id,
        })
    return {"message": "Sensor settings saved successfully", "results": results}

# ----------------------------------
# Endpoint: Save Alert Settings
# ----------------------------------
@app.post("/api/alert-settings")
async def save_alert_settings(
    alert_settings: List[AlertSettingInput],
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_active_user)
):
    """
    Save alert recipient settings. For each alert recipient, we create one record per alert method.
    NOTE: Because the Alert model requires a sensor_id (as a ForeignKey),
    we assign a default sensor_id of 1. Adjust this as needed.
    """
    created_alerts = []
    for alert in alert_settings:
        for a_type in alert.alert_type:
            contact = alert.mobile_number if a_type == "sms" else alert.email
            new_alert = models.Alert(
                sensor_id=1,  # default sensor id; adjust if you wish to associate alerts with a specific sensor
                alert_type=a_type,
                contact=contact,
                name=alert.name,
                Designation=alert.designation,
                is_enabled=True
            )
            db.add(new_alert)
            db.commit()
            db.refresh(new_alert)
            created_alerts.append({
                "id": new_alert.id,
                "sensor_id": new_alert.sensor_id,
                "alert_type": new_alert.alert_type,
                "contact": new_alert.contact,
                "name": new_alert.name,
                "Designation": new_alert.Designation,
            })
    return {"message": "Alert settings saved successfully", "alerts": created_alerts}
