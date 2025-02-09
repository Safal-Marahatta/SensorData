from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
    Date
)
from sqlalchemy.orm import relationship, declarative_base
import datetime

Base = declarative_base()

class Sensor(Base):
    """
    Sensor table.
    
    Fields:
        - sensor_id: Primary Key.
        - sensor_name: Name of the sensor.
        - sensor_location: Location of the sensor.
        - installed_date: Date the sensor was installed.
    """
    __tablename__ = "sensors"

    sensor_id = Column(Integer, primary_key=True, index=True)
    sensor_name = Column(String, nullable=False)
    sensor_location = Column(String, nullable=False)

class SensorParameter(Base):
    """
    Sensor parameters table.
    
    Fields:
        - id: Primary Key.
        - sensor_id: Foreign Key linking to Sensor.
        - parameter_code: Code identifier for the sensor parameter.
        - parameter_name: Name of the parameter.
        - unit: Unit of measurement.
        - upper_threshold: Maximum threshold value.
        - lower_threshold: Minimum threshold value.
        - logging_interval: Interval (in seconds or minutes) for logging.
    """
    __tablename__ = "sensor_parameters"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(Integer, ForeignKey("sensors.sensor_id"), nullable=False)
    parameter_code = Column(String, nullable=False)
    parameter_name = Column(String, nullable=False)
    unit = Column(String, nullable=False)
    upper_threshold = Column(Float, nullable=True)
    lower_threshold = Column(Float, nullable=True)
    logging_interval = Column(Integer, nullable=False)

    sensor = relationship("Sensor", back_populates="sensor_parameters")
    modbus_settings = relationship("ModbusSetting", back_populates="sensor_parameter", cascade="all, delete-orphan")
    modpoll_setting = relationship("ModpollSetting", back_populates="sensor_parameter", uselist=False, cascade="all, delete-orphan")
    sensor_data = relationship("SensorData", back_populates="sensor_parameter", cascade="all, delete-orphan")

class ModbusSetting(Base):
    __tablename__ = "modbus_settings"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=False)
    function_code = Column(String, nullable=False)
    register_address = Column(Integer, nullable=False)
    register_count = Column(Integer, nullable=False)
    variable = Column(String, nullable=False)
    multiplier = Column(Float, nullable=False)
    offset = Column(Float, nullable=False)

    sensor_parameter = relationship("SensorParameter", back_populates="modbus_settings")

class ModpollSetting(Base):
    __tablename__ = "modpoll_settings"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=False, unique=True)
    polling_interval = Column(Integer, nullable=False)
    delay = Column(Integer, nullable=False)

    sensor_parameter = relationship("SensorParameter", back_populates="modpoll_setting")

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=False)
    water_level_value = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)

    sensor_parameter = relationship("SensorParameter", back_populates="sensor_data")
