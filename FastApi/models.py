


from fastapi import FastAPI
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    Date,
    Boolean,
    ForeignKey,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship, declarative_base
import datetime

# SQLAlchemy base and model definitions
Base = declarative_base()


class GeneralSetting(Base):
    """
    General Settings table.
    """
    __tablename__ = "general_settings"

    id = Column(Integer, primary_key=True, index=True)
    station_id = Column(Integer, nullable=True)
    station_name = Column(String, nullable=False)
    server_address = Column(String, nullable=False)
    com_port = Column(String, nullable=False)
    baud_rate = Column(Integer, nullable=False)
    byte_size = Column(Integer, nullable=False)
    parity = Column(String, nullable=False)
    stopbit = Column(Integer, nullable=False)
    poll_interval = Column(Integer, nullable=False)
    poll_delay = Column(Integer, nullable=False)
    log_interval = Column(Integer, nullable=False)
    installed_date = Column(Date, default=datetime.date.today, nullable=False)

    # One-to-many relationship: a GeneralSetting has many Sensors.
    sensors = relationship("Sensor", back_populates="station")

    def __str__(self):
        return f"Station: {self.station_name}"




class Sensor(Base):
    """
    Sensor table.
    """
    __tablename__ = "sensors"

    sensor_id = Column(Integer, primary_key=True, index=True)
    sensor_name = Column(String, nullable=False)
    sensor_location = Column(String, nullable=True)
    # Foreign key to GeneralSetting
    station_id = Column(Integer, ForeignKey("general_settings.id"), nullable=False)
    sensor_serial_number = Column(String, nullable=True)
    bluetooth_code = Column(String, nullable=True)
    gauge_height = Column(Float, nullable=True)
    sensor_distance = Column(Float, nullable=True)

    # Relationship to GeneralSetting and SensorParameter.
    station = relationship("GeneralSetting", back_populates="sensors")
    parameters = relationship("SensorParameter", back_populates="sensor")

    def __str__(self):
        return f"Sensor: {self.sensor_name}"


class SensorParameter(Base):
    """
    Sensor Parameters table.
    """
    __tablename__ = "sensor_parameters"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(Integer, ForeignKey("sensors.sensor_id"), nullable=False)
    # variable = Column(String, nullable=True)
    parameter_name = Column(String, nullable=True)
    unit = Column(String, nullable=True)
    upper_threshold = Column(Float, nullable=True)
    lower_threshold = Column(Float, nullable=True)

    __table_args__ = (
        UniqueConstraint("sensor_id", "parameter_name", name="uix_sensor_param"),
    )

    # Relationships: back to Sensor and forward to other tables.
    sensor = relationship("Sensor", back_populates="parameters")
    modbus_settings = relationship("ModbusSetting", back_populates="sensor_parameter")
    sensor_data = relationship("SensorData", back_populates="sensor_parameter")
    sensor_raw_data = relationship("SensorRawData", back_populates="sensor_parameter")

    def __str__(self):
        return f"Parameter: {self.parameter_name or self.variable}"


class ModbusSetting(Base):
    """
    Modbus Settings table.
    """
    __tablename__ = "modbus_settings"

    id = Column(Integer, primary_key=True, index=True)
    sensor_parameter_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=True)
    slave_id = Column(Integer, nullable=True)
    function_code = Column(String, nullable=True)
    register_address = Column(Integer, nullable=True)
    register_count = Column(Integer, nullable=True)
    variable = Column(String, nullable=True)
    power=Column(Float,nullable=True)
    base_value=Column(Float,nullable=True)
    multiplier = Column(Float, nullable=True)
    offset = Column(Float, nullable=True)


    # Relationship back to SensorParameter.
    sensor_parameter = relationship("SensorParameter", back_populates="modbus_settings")

    def __str__(self):
        if self.sensor_parameter:
            return f"Modbus for {self.sensor_parameter}"
        return f"ModbusSetting {self.id}"


class SensorData(Base):
    """
    Sensor Data table.
    """
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    sensor_parameter_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=True)
    parameter = Column(String, nullable=True)
    value = Column(Float, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, nullable=True)

    # Relationship back to SensorParameter.
    sensor_parameter = relationship("SensorParameter", back_populates="sensor_data")

    def __str__(self):
        return f"Data: {self.parameter} = {self.value}"


class SensorRawData(Base):
    """
    Sensor Raw Data table.
    """
    __tablename__ = "sensor_raw_data"

    id = Column(Integer, primary_key=True, index=True)
    sensor_parameter_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=False)
    parameter = Column(String(50), nullable=False)
    value = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationship back to SensorParameter.
    sensor_parameter = relationship("SensorParameter", back_populates="sensor_raw_data")

    def __str__(self):
        return f"Raw Data: {self.parameter} = {self.value}"
    



class Alert(Base):
    """
    Alerts table.
    """
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    designation = Column(String, nullable=False)
    mobile_number = Column(String, nullable=False)
    email = Column(String, nullable=False)
    email_alert = Column(Boolean, default=False, nullable=False)  # Changed here
    sms_alert = Column(Boolean, default=False, nullable=False)    # Changed here
    is_enabled = Column(Boolean, default=True, nullable=False)

    __table_args__ = (
        UniqueConstraint("name", "designation", name="_name_designation_uc"),
    )

    def __str__(self):
        return f"Alert: {self.name} ({self.designation})"




# For user account, please show only these parameters:
# 1. Privileges
# Online Mode: Enabled/Disabled 
# SMS Alert: Enabled/Disabled 
# Email Alert: Enabled/ Disabled 
# Siren Alert: Enabled/Disabled
# 2. Alert Settings 
# SN, Name, Designation, SMS Alert, Email Alert




#user lai 