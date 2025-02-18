
# from sqlalchemy import (
#     Column,
#     Integer,
#     String,
#     Float,
#     DateTime,
#     Date,
#     Boolean,
#     ForeignKey,
#     UniqueConstraint,
# )
# from sqlalchemy.orm import relationship, declarative_base
# import datetime

# Base = declarative_base()


# class GeneralSetting(Base):
#     """
#     General Settings table.

#     Fields:
#         - id: Primary Key.
#         - station_id: Station ID.
#         - station_name: Station Name.
#         - server_address: Server Address.
#         - com_port: Communication Port.
#         - baud_rate: Baud Rate.
#         - byte_size: Byte Size.
#         - parity: Parity.
#         - stopbit: Stop bits.
#         - poll_interval: Polling interval.
#         - poll_delay: Poll delay.
#         - log_interval: Logging interval.
#         - installed_date: Date when the system was installed.
#     """
#     __tablename__ = "general_settings"

#     id = Column(Integer, primary_key=True, index=True)
#     station_id = Column(Integer, nullable=True)
#     station_name = Column(String, nullable=False)
#     server_address = Column(String, nullable=False)
#     com_port = Column(String, nullable=False)
#     baud_rate = Column(Integer, nullable=False)
#     byte_size = Column(Integer, nullable=False)
#     parity = Column(String, nullable=False)
#     stopbit = Column(Integer, nullable=False)
#     poll_interval = Column(Integer, nullable=False)
#     poll_delay = Column(Integer, nullable=False)
#     log_interval = Column(Integer, nullable=False)
#     installed_date = Column(Date, default=datetime.date.today, nullable=False)

#     # Relationship to Sensor (one GeneralSetting can have many Sensors)
#     sensors = relationship("Sensor", back_populates="station")

#     def __str__(self):
#         # Display the station name in dropdowns or relationships.
#         return f"Station: {self.station_name}"


# class Alert(Base):
#     """
#     Alerts table.

#     Fields:
#         - id: Primary Key.
#         - name: Name.
#         - designation: Designation.
#         - mobile_number: Mobile number.
#         - email: Email.
#         - alert_type: Alert types (comma-separated).
#         - is_enabled: Status flag.
#     """
#     __tablename__ = "alerts"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, nullable=False)
#     designation = Column(String, nullable=False)
#     mobile_number = Column(String, nullable=False)
#     email = Column(String, nullable=False)
#     alert_type = Column(String, nullable=False)  # Will store comma-separated values
#     is_enabled = Column(Boolean, default=True, nullable=False)

#     __table_args__ = (
#         UniqueConstraint("name", "designation", name="_name_designation_uc"),
#     )

#     def __str__(self):
#         return f"Alert: {self.name} ({self.designation})"


# class Sensor(Base):
#     """
#     Sensor table.

#     Fields:
#         - sensor_id: Primary Key.
#         - sensor_name: Name of the sensor.
#         - sensor_location: Location of the sensor.
#         - station_id: Foreign Key linking to GeneralSetting.
#         - sensor_serial_number: The sensor's serial number.
#         - bluetooth_code: Bluetooth code for the sensor.
#         - gauge_height: Height of the sensor's gauge.
#         - sensor_distance: Distance measurement from the sensor.
#     """
#     __tablename__ = "sensors"

#     sensor_id = Column(Integer, primary_key=True, index=True)
#     sensor_name = Column(String, nullable=False)
#     sensor_location = Column(String, nullable=True)
#     # Now defined as a foreign key to GeneralSetting
#     station_id = Column(Integer, ForeignKey("general_settings.id"), nullable=False)
#     sensor_serial_number = Column(String, nullable=True)
#     bluetooth_code = Column(String, nullable=True)
#     gauge_height = Column(Float, nullable=True)
#     sensor_distance = Column(Float, nullable=True)

#     # Relationship back to GeneralSetting
#     station = relationship("GeneralSetting", back_populates="sensors")
#     # Relationship to SensorParameter (one Sensor can have many parameters)
#     parameters = relationship("SensorParameter", back_populates="sensor")

#     def __str__(self):
#         # Display the sensor name.
#         return f"Sensor: {self.sensor_name}"


# class SensorParameter(Base):
#     """
#     Sensor Parameters table.

#     Fields:
#         - id: Primary Key.
#         - sensor_id: Foreign Key linking to Sensor.
#         - variable: Variable name.
#         - parameter_name: Name of the parameter.
#         - unit: Unit of measurement.
#         - upper_threshold: Maximum threshold value.
#         - lower_threshold: Minimum threshold value.
#     """
#     __tablename__ = "sensor_parameters"

#     id = Column(Integer, primary_key=True, index=True)
#     sensor_id = Column(Integer, ForeignKey("sensors.sensor_id"), nullable=False)
#     variable = Column(String, nullable=True)
#     parameter_name = Column(String, nullable=True)
#     unit = Column(String, nullable=True)
#     upper_threshold = Column(Float, nullable=True)
#     lower_threshold = Column(Float, nullable=True)

#     __table_args__ = (
#         UniqueConstraint("sensor_id", "parameter_name", name="uix_sensor_param"),
#     )

#     # Relationship back to Sensor
#     sensor = relationship("Sensor", back_populates="parameters")
#     # Relationships to other tables that reference SensorParameter
#     modbus_settings = relationship("ModbusSetting", back_populates="sensor_parameter")
#     sensor_data = relationship("SensorData", back_populates="sensor_parameter")
#     sensor_raw_data = relationship("SensorRawData", back_populates="sensor_parameter")

#     def __str__(self):
#         # Display a friendly parameter name.
#         return f"Parameter: {self.parameter_name or self.variable}"


# class ModbusSetting(Base):
#     """
#     Modbus Settings table.

#     Fields:
#         - id: Primary Key.
#         - sensor_parameter_id: Foreign Key linking to SensorParameter.
#         - slave_id: Slave ID.
#         - function_code: Modbus function code.
#         - register_address: Register address.
#         - register_count: Number of registers.
#         - variable: Variable name.
#         - multiplier: Scaling multiplier.
#         - offset: Offset value.
#     """
#     __tablename__ = "modbus_settings"

#     id = Column(Integer, primary_key=True, index=True)
#     sensor_parameter_id = Column(
#         Integer, ForeignKey("sensor_parameters.id"), nullable=True
#     )
#     slave_id = Column(Integer, nullable=True)
#     function_code = Column(String, nullable=True)
#     register_address = Column(Integer, nullable=True)
#     register_count = Column(Integer, nullable=True)
#     variable = Column(String, nullable=True)
#     multiplier = Column(Float, nullable=True)
#     offset = Column(Float, nullable=True)

#     # Relationship back to SensorParameter
#     sensor_parameter = relationship("SensorParameter", back_populates="modbus_settings")

#     def __str__(self):
#         # Show a friendly name referencing its Sensor Parameter.
#         if self.sensor_parameter:
#             return f"Modbus for {self.sensor_parameter}"
#         return f"ModbusSetting {self.id}"


# class SensorData(Base):
#     """
#     Sensor Data table.

#     Fields:
#         - id: Primary Key.
#         - sensor_parameter_id: Foreign Key linking to SensorParameter.
#         - parameter: Parameter name.
#         - value: Recorded value.
#         - timestamp: Date and time when the data was recorded.
#     """
#     __tablename__ = "sensor_data"

#     id = Column(Integer, primary_key=True, index=True)
#     sensor_parameter_id = Column(
#         Integer, ForeignKey("sensor_parameters.id"), nullable=True
#     )
#     parameter = Column(String, nullable=True)
#     value = Column(Float, nullable=True)
#     timestamp = Column(
#         DateTime, default=datetime.datetime.utcnow, nullable=True
#     )

#     # Relationship back to SensorParameter
#     sensor_parameter = relationship("SensorParameter", back_populates="sensor_data")

#     def __str__(self):
#         return f"Data: {self.parameter} = {self.value}"


# class SensorRawData(Base):
#     """
#     Sensor Raw Data table.

#     Fields:
#         - id: Primary Key.
#         - sensor_parameter_id: Foreign Key linking to SensorParameter.
#         - parameter: Parameter name (max 50 characters).
#         - value: Recorded raw value.
#         - timestamp: Date and time when the raw data was recorded.
#     """
#     __tablename__ = "sensor_raw_data"

#     id = Column(Integer, primary_key=True, index=True)
#     sensor_parameter_id = Column(
#         Integer, ForeignKey("sensor_parameters.id"), nullable=False
#     )
#     parameter = Column(String(50), nullable=False)
#     value = Column(Float, nullable=False)
#     timestamp = Column(DateTime, default=datetime.datetime.utcnow)

#     # Relationship back to SensorParameter
#     sensor_parameter = relationship("SensorParameter", back_populates="sensor_raw_data")

#     def __str__(self):
#         return f"Raw Data: {self.parameter} = {self.value}"


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
    variable = Column(String, nullable=True)
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
    alert_type = Column(String, nullable=False)  # comma-separated values
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