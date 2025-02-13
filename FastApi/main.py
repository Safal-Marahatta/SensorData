# # # Note: In a production system you should:

# # # Use a real database.
# # # Hash passwords securely (for example with PassLib’s bcrypt, rather than a “fake” hash).
# # # Securely generate and store your secret key.
# # # Consider using OAuth2 properly (with secure token storage and refresh tokens, etc).


# # from datetime import datetime, timedelta
# # from typing import Optional, Dict

# # from fastapi import FastAPI, Depends, HTTPException, status
# # from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# # from jose import JWTError, jwt
# # from pydantic import BaseModel
# # import models

# # #----cors Header-----
# # from fastapi.middleware.cors import CORSMiddleware

# # ####################################this is for creating the database that is defined in the models.py
# # from database import engine, SessionLocal
# # import models

# # # Create all database tables
# # models.Base.metadata.create_all(bind=engine)

# # ######################################################################################################

# # app = FastAPI()

# # # Define the origins that are allowed to access your backend
# # origins = [
# #     "http://localhost:5173",  # your React app's URL
# #     # add other origins if needed, e.g., "http://localhost:3000"
# # ]

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=origins,           # Allowed origins
# #     allow_credentials=True,
# #     allow_methods=["*"],             # Allow all methods (GET, POST, etc.)
# #     allow_headers=["*"],             # Allow all headers
# # )




# # # -- Configuration --

# # SECRET_KEY = "your_secret_key_here"  # Change this to a strong secret in production!
# # ALGORITHM = "HS256"
# # ACCESS_TOKEN_EXPIRE_MINUTES = 30

# # # -- Fake Database --

# # # We create a fake database with two users: one regular user and one admin.
# # fake_users_db: Dict[str, Dict] = {
# #     "user": {
# #         "username": "user",
# #         "hashed_password": "fakehasheduser",  # in production, use a real hash!
# #         "role": "user",
# #     },
# #     "admin": {
# #         "username": "admin",
# #         "hashed_password": "fakehashedadmin",  # in production, use a real hash!
# #         "role": "admin",
# #     },
# # }

# # # -- Pydantic Models --

# # class Token(BaseModel):
# #     access_token: str
# #     token_type: str

# # class TokenData(BaseModel):
# #     username: Optional[str] = None
# #     role: Optional[str] = None

# # class User(BaseModel):
# #     username: str
# #     role: str

# # class UserInDB(User):
# #     hashed_password: str

# # # -- Utility Functions --

# # def fake_hash_password(password: str) -> str:
# #     """
# #     A fake password hashing function.
# #     In production, use a secure hash like bcrypt.
# #     """
# #     return "fakehashed" + password

# # def verify_password(plain_password: str, hashed_password: str) -> bool:
# #     """
# #     Verify the provided password against the stored (fake) hashed password.
# #     """
# #     return fake_hash_password(plain_password) == hashed_password

# # def get_user(db, username: str) -> Optional[UserInDB]:
# #     if username in db:
# #         user_dict = db[username]
# #         return UserInDB(**user_dict)
# #     return None

# # def authenticate_user(db, username: str, password: str) -> Optional[UserInDB]:
# #     user = get_user(db, username)
# #     if not user or not verify_password(password, user.hashed_password):
# #         return None
# #     return user

# # def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
# #     """
# #     Create a JWT token with an expiration time.
# #     """
# #     to_encode = data.copy()
# #     expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
# #     to_encode.update({"exp": expire})
# #     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
# #     return encoded_jwt

# # # -- FastAPI Application Setup --


# # # This will look for a bearer token in the Authorization header.
# # oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# # # -- Authentication Endpoints --

# # @app.post("/token", response_model=Token)
# # async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
# #     """
# #     This endpoint receives form data (username and password), authenticates the user,
# #     and returns a JWT access token if successful.
# #     """
# #     user = authenticate_user(fake_users_db, form_data.username, form_data.password)
# #     if not user:
# #         raise HTTPException(
# #             status_code=status.HTTP_401_UNAUTHORIZED,
# #             detail="Incorrect username or password",
# #             headers={"WWW-Authenticate": "Bearer"},
# #         )
# #     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
# #     # The token contains the subject (username) and the user's role.
# #     access_token = create_access_token(
# #         data={"sub": user.username, "role": user.role},
# #         expires_delta=access_token_expires,
# #     )
# #     return {"access_token": access_token, "token_type": "bearer"}

# # # -- Dependency to Get Current User from Token --

# # async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserInDB:
# #     """
# #     Decode the JWT token and retrieve the corresponding user.
# #     """
# #     credentials_exception = HTTPException(
# #         status_code=status.HTTP_401_UNAUTHORIZED,
# #         detail="Could not validate credentials",
# #         headers={"WWW-Authenticate": "Bearer"},
# #     )
# #     try:
# #         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
# #         username: Optional[str] = payload.get("sub")
# #         role: Optional[str] = payload.get("role")
# #         if username is None or role is None:
# #             raise credentials_exception
# #         token_data = TokenData(username=username, role=role)
# #     except JWTError:
# #         raise credentials_exception
# #     user = get_user(fake_users_db, token_data.username)
# #     if user is None:
# #         raise credentials_exception
# #     return user

# # async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)) -> UserInDB:
# #     """
# #     In a real application, you might check if the user is active.
# #     Here, we assume that if the token is valid, the user is active.
# #     """
# #     return current_user

# # # -- Protected Endpoints --

# # @app.get("/users/me", response_model=User)
# # async def read_users_me(current_user: UserInDB = Depends(get_current_active_user)):
# #     """
# #     An endpoint to get the current user's information.
# #     Accessible by both regular users and admins.
# #     """
# #     return User(username=current_user.username, role=current_user.role)

# # def admin_required(current_user: UserInDB = Depends(get_current_active_user)) -> UserInDB:
# #     """
# #     Dependency that checks if the current user is an admin.
# #     """
# #     if current_user.role != "admin":
# #         raise HTTPException(status_code=403, detail="Not enough permissions")
# #     return current_user

# # @app.get("/admin", response_model=User)
# # async def read_admin_data(current_user: UserInDB = Depends(admin_required)):
# #     """
# #     An endpoint that only admin users can access.
# #     """
# #     return User(username=current_user.username, role=current_user.role)

# # # -- Optional: User Signup Endpoint --

# # @app.post("/signup", response_model=User)
# # async def create_user(username: str, password: str, role: str = "user"):
# #     """
# #     A simple endpoint to create a new user.
# #     By default, new users get the "user" role; to create an admin,
# #     you can set role="admin" (but in production, restrict admin creation).
# #     """
# #     if username in fake_users_db:
# #         raise HTTPException(status_code=400, detail="Username already exists")
# #     hashed_password = fake_hash_password(password)
# #     fake_users_db[username] = {
# #         "username": username,
# #         "hashed_password": hashed_password,
# #         "role": role,
# #     }
# #     return User(username=username, role=role)
# # ##########################################################################################################################################################
# # ##########################################################################################################################################################

# # from datetime import datetime, timedelta
# # import random


# # # Define the data model for a sensor reading.
# # class SensorReading(BaseModel):
# #     value: float
# #     sensorid: int
# #     timestamp: str

# # @app.get("/sensor-data")
# # def get_sensor_data(current_user: UserInDB = Depends(get_current_active_user)):
# #     sensors = {}
# #     # For sensor IDs 1 through 7
# #     for sensor_id in range(1, 8):
# #         readings = []
# #         now = datetime.utcnow()  # Using UTC for timestamps
# #         # Generate 100 readings per sensor.
# #         for i in range(100):
# #             # For a historical feel, spread timestamps over the last 50 seconds.
# #             reading_time = now - timedelta(seconds=50 - i)
# #             reading = SensorReading(
# #                 value=random.uniform(50, 52),  # Random value between 0 and 100
# #                 sensorid=sensor_id,
# #                 timestamp=reading_time.isoformat() + "Z"  # Append "Z" to indicate UTC
# #             )
# #             readings.append(reading.dict())
# #         sensors[sensor_id] = readings
# #     return sensors



# # # ===============================
# # # NEW: Settings endpoints
# # # ===============================





# from datetime import datetime, timedelta, date
# from typing import Optional, Dict

# from fastapi import FastAPI, Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from jose import JWTError, jwt
# from pydantic import BaseModel
# import models

# # ---- CORS Configuration ----
# from fastapi.middleware.cors import CORSMiddleware

# ####################################
# # Database
# ####################################
# from database import engine, SessionLocal
# from sqlalchemy.orm import Session

# # Create all database tables defined in models.py
# models.Base.metadata.create_all(bind=engine)

# app = FastAPI()

# # Define allowed origins (adjust as needed)
# origins = [
#     "http://localhost:5173",  # your frontend URL
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,           
#     allow_credentials=True,
#     allow_methods=["*"],             
#     allow_headers=["*"],             
# )

# ####################################
# # Authentication and Authorization
# ####################################

# SECRET_KEY = "your_secret_key_here"  # Change this in production!
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

# # Fake database of users
# fake_users_db: Dict[str, Dict] = {
#     "user": {
#         "username": "user",
#         "hashed_password": "fakehasheduser",  # In production, use a secure hash!
#         "role": "user",
#     },
#     "admin": {
#         "username": "admin",
#         "hashed_password": "fakehashedadmin",  # In production, use a secure hash!
#         "role": "admin",
#     },
# }

# class Token(BaseModel):
#     access_token: str
#     token_type: str

# class TokenData(BaseModel):
#     username: Optional[str] = None
#     role: Optional[str] = None

# class User(BaseModel):
#     username: str
#     role: str

# class UserInDB(User):
#     hashed_password: str

# def fake_hash_password(password: str) -> str:
#     """Fake password hashing (do not use in production)."""
#     return "fakehashed" + password

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return fake_hash_password(plain_password) == hashed_password

# def get_user(db, username: str) -> Optional[UserInDB]:
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)
#     return None

# def authenticate_user(db, username: str, password: str) -> Optional[UserInDB]:
#     user = get_user(db, username)
#     if not user or not verify_password(password, user.hashed_password):
#         return None
#     return user

# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
#     to_encode = data.copy()
#     expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# # OAuth2 setup
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# @app.post("/token", response_model=Token)
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
#     user = authenticate_user(fake_users_db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username, "role": user.role},
#         expires_delta=access_token_expires,
#     )
#     return {"access_token": access_token, "token_type": "bearer"}

# async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserInDB:
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: Optional[str] = payload.get("sub")
#         role: Optional[str] = payload.get("role")
#         if username is None or role is None:
#             raise credentials_exception
#         token_data = TokenData(username=username, role=role)
#     except JWTError:
#         raise credentials_exception
#     user = get_user(fake_users_db, token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user

# async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)) -> UserInDB:
#     # Additional checks (e.g., is_active) can be added here
#     return current_user

# @app.get("/users/me", response_model=User)
# async def read_users_me(current_user: UserInDB = Depends(get_current_active_user)):
#     return User(username=current_user.username, role=current_user.role)

# def admin_required(current_user: UserInDB = Depends(get_current_active_user)) -> UserInDB:
#     if current_user.role != "admin":
#         raise HTTPException(status_code=403, detail="Not enough permissions")
#     return current_user

# @app.get("/admin", response_model=User)
# async def read_admin_data(current_user: UserInDB = Depends(admin_required)):
#     return User(username=current_user.username, role=current_user.role)

# @app.post("/signup", response_model=User)
# async def create_user(username: str, password: str, role: str = "user"):
#     if username in fake_users_db:
#         raise HTTPException(status_code=400, detail="Username already exists")
#     hashed_password = fake_hash_password(password)
#     fake_users_db[username] = {
#         "username": username,
#         "hashed_password": hashed_password,
#         "role": role,
#     }
#     return User(username=username, role=role)

# ####################################
# # Sample Sensor Data Endpoint
# ####################################
# import random

# class SensorReading(BaseModel):
#     value: float
#     sensorid: int
#     timestamp: str

# @app.get("/sensor-data")
# def get_sensor_data(current_user: UserInDB = Depends(get_current_active_user)):
#     sensors = {}
#     for sensor_id in range(1, 8):
#         readings = []
#         now = datetime.utcnow()
#         for i in range(100):
#             reading_time = now - timedelta(seconds=50 - i)
#             reading = SensorReading(
#                 value=random.uniform(50, 52),
#                 sensorid=sensor_id,
#                 timestamp=reading_time.isoformat() + "Z"
#             )
#             readings.append(reading.dict())
#         sensors[sensor_id] = readings
#     return sensors

# ####################################
# # Dependency: Database Session
# ####################################
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# ####################################
# # General Settings Endpoints
# ####################################

# # Pydantic models for GeneralSetting input/output
# class GeneralSettingCreate(BaseModel):
#     station_id: Optional[int] = None
#     station_name: str
#     server_address: str
#     com_port: str
#     baud_rate: int
#     byte_size: int
#     parity: str
#     stopbit: int
#     poll_interval: int
#     poll_delay: int
#     log_interval: int
#     installed_date: date

#     class Config:
#         orm_mode = True

# class GeneralSettingOut(GeneralSettingCreate):
#     id: int

#     class Config:
#         orm_mode = True

# @app.post("/general-settings", response_model=GeneralSettingOut)
# def update_general_settings(
#     settings: GeneralSettingCreate,
#     db: Session = Depends(get_db),
#     current_user: UserInDB = Depends(admin_required)
# ):
#     """
#     This endpoint receives new general settings from the frontend.
#     It checks if any previous settings exist. If yes, they are deleted,
#     and the new settings are saved.
    
#     Example JSON payload:
#     {
#         "station_id": 1,
#         "station_name": "Main Station",
#         "server_address": "192.168.1.100",
#         "com_port": "COM3",
#         "baud_rate": 9600,
#         "byte_size": 8,
#         "parity": "None",
#         "stopbit": 1,
#         "poll_interval": 5000,
#         "poll_delay": 1000,
#         "log_interval": 60,
#         "installed_date": "2023-01-01"
#     }
#     """
#     # Delete all existing GeneralSetting records
#     existing_settings = db.query(models.GeneralSetting).all()
#     for setting_obj in existing_settings:
#         db.delete(setting_obj)
#     db.commit()

#     # Create and save new GeneralSetting record
#     new_setting = models.GeneralSetting(
#         station_id=settings.station_id,
#         station_name=settings.station_name,
#         server_address=settings.server_address,
#         com_port=settings.com_port,
#         baud_rate=settings.baud_rate,
#         byte_size=settings.byte_size,
#         parity=settings.parity,
#         stopbit=settings.stopbit,
#         poll_interval=settings.poll_interval,
#         poll_delay=settings.poll_delay,
#         log_interval=settings.log_interval,
#         installed_date=settings.installed_date,
#     )
#     db.add(new_setting)
#     db.commit()
#     db.refresh(new_setting)
#     return new_setting


from datetime import datetime, timedelta, date
from typing import Optional, Dict

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from pydantic import BaseModel
import models

# ---- CORS Configuration ----
from fastapi.middleware.cors import CORSMiddleware

####################################
# Database
####################################
from database import engine, SessionLocal
from sqlalchemy.orm import Session

# Create all database tables defined in models.py
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Define allowed origins (adjust as needed)
origins = [
    "http://localhost:5173",  # your frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           
    allow_credentials=True,
    allow_methods=["*"],             
    allow_headers=["*"],             
)

####################################
# Authentication and Authorization
####################################

SECRET_KEY = "your_secret_key_here"  # Change this in production!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Fake database of users
fake_users_db: Dict[str, Dict] = {
    "user": {
        "username": "user",
        "hashed_password": "fakehasheduser",  # In production, use a secure hash!
        "role": "user",
    },
    "admin": {
        "username": "admin",
        "hashed_password": "fakehashedadmin",  # In production, use a secure hash!
        "role": "admin",
    },
}

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

def fake_hash_password(password: str) -> str:
    """Fake password hashing (do not use in production)."""
    return "fakehashed" + password

def verify_password(plain_password: str, hashed_password: str) -> bool:
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
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# OAuth2 setup
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role},
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserInDB:
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
    # Additional checks (e.g., is_active) can be added here
    return current_user

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: UserInDB = Depends(get_current_active_user)):
    return User(username=current_user.username, role=current_user.role)

def admin_required(current_user: UserInDB = Depends(get_current_active_user)) -> UserInDB:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user

@app.get("/admin", response_model=User)
async def read_admin_data(current_user: UserInDB = Depends(admin_required)):
    return User(username=current_user.username, role=current_user.role)

@app.post("/signup", response_model=User)
async def create_user(username: str, password: str, role: str = "user"):
    if username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_password = fake_hash_password(password)
    fake_users_db[username] = {
        "username": username,
        "hashed_password": hashed_password,
        "role": role,
    }
    return User(username=username, role=role)

####################################
# Sample Sensor Data Endpoint
####################################
import random

class SensorReading(BaseModel):
    value: float
    sensorid: int
    timestamp: str

@app.get("/sensor-data")
def get_sensor_data(current_user: UserInDB = Depends(get_current_active_user)):
    sensors = {}
    for sensor_id in range(1, 8):
        readings = []
        now = datetime.utcnow()
        for i in range(100):
            reading_time = now - timedelta(seconds=50 - i)
            reading = SensorReading(
                value=random.uniform(50, 52),
                sensorid=sensor_id,
                timestamp=reading_time.isoformat() + "Z"
            )
            readings.append(reading.dict())
        sensors[sensor_id] = readings
    return sensors

####################################
# Dependency: Database Session
####################################
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

####################################
# General Settings Endpoints
####################################

# Pydantic models for GeneralSetting input/output
class GeneralSettingCreate(BaseModel):
    station_id: Optional[int] = None
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
    installed_date: date

    class Config:
        orm_mode = True

class GeneralSettingOut(GeneralSettingCreate):
    id: int

    class Config:
        orm_mode = True

@app.post("/general-settings", response_model=GeneralSettingOut)
def update_general_settings(
    settings: GeneralSettingCreate,
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(admin_required)
):
    """
    This endpoint receives new general settings from the frontend.
    It checks if any previous settings exist. If yes, they are deleted,
    and the new settings are saved.
    
    Example JSON payload:
    {
        "station_id": 1,
        "station_name": "Main Station",
        "server_address": "192.168.1.100",
        "com_port": "COM3",
        "baud_rate": 9600,
        "byte_size": 8,
        "parity": "None",
        "stopbit": 1,
        "poll_interval": 5000,
        "poll_delay": 1000,
        "log_interval": 60,
        "installed_date": "2023-01-01"
    }
    """
    # Delete all existing GeneralSetting records
    existing_settings = db.query(models.GeneralSetting).all()
    for setting_obj in existing_settings:
        db.delete(setting_obj)
    db.commit()

    # Create and save new GeneralSetting record
    new_setting = models.GeneralSetting(
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
        log_interval=settings.log_interval,
        installed_date=settings.installed_date,
    )
    db.add(new_setting)
    db.commit()
    db.refresh(new_setting)
    return new_setting
