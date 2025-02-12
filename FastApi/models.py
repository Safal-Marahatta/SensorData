# # from sqlalchemy import (
# #     Column,
# #     Integer,
# #     String,
# #     Float,
# #     DateTime,
# #     ForeignKey,
# #     Date
# # )
# # from sqlalchemy.orm import relationship, declarative_base
# # import datetime

# # Base = declarative_base()

# # class GeneralSetting(Base):
# #     """
# #     General Setting table.
    
# #     Fields:
# #         - id: Primary Key.
# #         - station_id: Station ID.
# #         - station_name: Station Name.
# #         - server: Server Address.
# #         - logging_interval: Logging Inerval.
# #         - sms_alert: SMS option.
# #         - mobile: Mobile Number with comma separated
# #         - email_alert: Email Option.
# # .        - email: Email ID.
# #         - installed_date: Date the system was installed.
# #     """
# #     tablename = "general_settings"

# #     id = Column(Integer, primary_key=True, index=True)
# #     station_id = Column(Integer, nullable=True)
# #     station_name = Column(String, nullable=False)
# #     sensor settings
# # •	id,
# # •	station_id,
# # •	station_name
# # •	server_address
# # •	com_port
# # •	baud_rate
# # •	byte_size
# # •	parity
# # •	stopbit•	poll_interval
# # •	poll_delay
# # •	log_interval
# # •	sms_alert
# # •	mobile_number
# # •	email_alert
# # •	email

# # class Sensor(Base):
# #     """
# #     Sensor table.
    
# #     Fields:
# #         - sensor_id: Primary Key.
# #         - sensor_name: Name of the sensor.
# #         - sensor_location: Location of the sensor.

# #     """
# #     tablename = "sensors"

# #     sensor_id = Column(Integer, primary_key=True, index=True)
# #     sensor_name = Column(String, nullable=False)
# #     station_id=


# # class SensorParameter(Base):
# #     """
# #     Sensor parameters table.
    
# #     Fields:
# #         - id: Primary Key.
# #         - sensor_id: Foreign Key linking to Sensor.
# #         - parameter_code: Code identifier for the sensor parameter.
# #         - parameter_name: Name of the parameter.
# #         - unit: Unit of measurement.
# #         - upper_threshold: Maximum threshold value.
# #         - lower_threshold: Minimum threshold value.
# #         - logging_interval: Interval (in seconds or minutes) for logging.
# #     """
# #     tablename = "sensor_parameters"

# #     id = Column(Integer, primary_key=True, index=True)
# #     sensor_id = Column(Integer, ForeignKey("sensors.sensor_id"), nullable=False)
# #     parameter_code = Column(String, nullable=False)
# #     parameter_name = Column(String, nullable=False)
# #     unit = Column(String, nullable=False)
# #     upper_threshold = Column(Float, nullable=True)
# #     lower_threshold = Column(Float, nullable=True)
# #    # logging_interval = Column(Integer, nullable=False)
# #     sensor = relationship("Sensor", back_populates="sensor_parameters")
# #     modbus_settings = relationship("ModbusSetting", back_populates="sensor_parameter", cascade="all, delete-orphan")
# #     sensor_data = relationship("SensorData", back_populates="sensor_parameter", cascade="all, delete-orphan")

# # class Sensorsetting(Base):
# #     tablename = "modbus_settings"
# #     id = Column(Integer, primary_key=True, index=True)
# #     sensor_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=False)
# #     slave_id = Column(Integer, nullable=False)    
# #     function_code = Column(String, nullable=False)
# #     register_address = Column(Integer, nullable=False)
# #     register_count = Column(Integer, nullable=False)
# #     variable = Column(String, nullable=False)
# #     multiplier = Column(Float, nullable=False)
# #     offset = Column(Float, nullable=False)
# #     sensor_parameter = relationship("SensorParameter", back_populates="modbus_settings")

# # class SensorData(Base):
# #     tablename = "sensor_data"

# #     id = Column(Integer, primary_key=True, index=True)
# #     sensor_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=False)
# #     parameter = Column(String, nullable=False)
# #     value = Column(Float, nullable=False)
# #     timestamp = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)

# #     sensor_parameter = relationship("SensorParameter", back_populates="sensor_data")




# from sqlalchemy import (
#     Column,
#     Integer,
#     String,
#     Float,
#     DateTime,
#     Date,
#     Boolean,
#     ForeignKey
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

#     # Relationship to Alerts (each station can have multiple alert configurations)
#     alerts = relationship("Alert", back_populates="general_setting", cascade="all, delete-orphan")
#     # Relationship to Sensors (assuming each sensor is linked to a station)
#     sensors = relationship("Sensor", back_populates="general_setting", cascade="all, delete-orphan")


# class Alert(Base):
#     """
#     Alert configuration table.

#     Fields:
#         - id: Primary Key.
#         - general_setting_id: Foreign key linking to GeneralSetting.
#         - alert_type: Type of alert ('sms' or 'email').
#         - contact: Contact information (mobile number or email address).
#         - is_enabled: Flag indicating if the alert is active.
#     """
#     __tablename__ = "alerts"

#     id = Column(Integer, primary_key=True, index=True)
#     general_setting_id = Column(Integer, ForeignKey("general_settings.id"), nullable=False)
#     alert_type = Column(String, nullable=False)  # e.g., 'sms' or 'email'
#     contact = Column(String, nullable=False)
#     is_enabled = Column(Boolean, default=True, nullable=False)

#     general_setting = relationship("GeneralSetting", back_populates="alerts")


# class Sensor(Base):
#     """
#     Sensor table.

#     Fields:
#         - sensor_id: Primary Key.
#         - sensor_name: Name of the sensor.
#         - sensor_location: Location of the sensor.
#         - station_id: Foreign Key linking to GeneralSetting.
#     """
#     __tablename__ = "sensors"

#     sensor_id = Column(Integer, primary_key=True, index=True)
#     sensor_name = Column(String, nullable=False)
#     sensor_location = Column(String, nullable=True)
#     station_id = Column(Integer, ForeignKey("general_settings.id"), nullable=False)

#     general_setting = relationship("GeneralSetting", back_populates="sensors")
#     sensor_parameters = relationship("SensorParameter", back_populates="sensor", cascade="all, delete-orphan")


# class SensorParameter(Base):
#     """
#     Sensor Parameters table.

#     Fields:
#         - id: Primary Key.
#         - sensor_id: Foreign Key linking to Sensor.
#         - parameter_code: Code identifier for the sensor parameter.
#         - parameter_name: Name of the parameter.
#         - unit: Unit of measurement.
#         - upper_threshold: Maximum threshold value.
#         - lower_threshold: Minimum threshold value.
#         - logging_interval: Interval for logging data.
#     """
#     __tablename__ = "sensor_parameters"

#     id = Column(Integer, primary_key=True, index=True)
#     sensor_id = Column(Integer, ForeignKey("sensors.sensor_id"), nullable=False)
#     parameter_code = Column(String, nullable=False)
#     parameter_name = Column(String, nullable=False)
#     unit = Column(String, nullable=False)
#     upper_threshold = Column(Float, nullable=True)
#     lower_threshold = Column(Float, nullable=True)
#     logging_interval = Column(Integer, nullable=False)

#     sensor = relationship("Sensor", back_populates="sensor_parameters")
#     modbus_settings = relationship("ModbusSetting", back_populates="sensor_parameter", cascade="all, delete-orphan")
#     sensor_data = relationship("SensorData", back_populates="sensor_parameter", cascade="all, delete-orphan")


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
#     sensor_parameter_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=False)
#     slave_id = Column(Integer, nullable=False)
#     function_code = Column(String, nullable=False)
#     register_address = Column(Integer, nullable=False)
#     register_count = Column(Integer, nullable=False)
#     variable = Column(String, nullable=False)
#     multiplier = Column(Float, nullable=False)
#     offset = Column(Float, nullable=False)

#     sensor_parameter = relationship("SensorParameter", back_populates="modbus_settings")


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
#     sensor_parameter_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=False)
#     parameter = Column(String, nullable=False)
#     value = Column(Float, nullable=False)
#     timestamp = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
#      # sensor_parameter = relationship("SensorParameter", back_populates="sensor_data")



from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    Date,
    Boolean,
    ForeignKey
)
from sqlalchemy.orm import relationship, declarative_base
import datetime

Base = declarative_base()


class GeneralSetting(Base):
    """
    General Settings table.

    Fields:
        - id: Primary Key.
        - station_id: Station ID.
        - station_name: Station Name.
        - server_address: Server Address.
        - com_port: Communication Port.
        - baud_rate: Baud Rate.
        - byte_size: Byte Size.
        - parity: Parity.
        - stopbit: Stop bits.
        - poll_interval: Polling interval.
        - poll_delay: Poll delay.
        - log_interval: Logging interval.
        - installed_date: Date when the system was installed.
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


class Alert(Base):
    """
    Alert configuration table.

    Fields:
        - id: Primary Key.
        - general_setting_id: Foreign key linking to GeneralSetting.
        - alert_type: Type of alert ('sms' or 'email').
        - contact: Contact information (mobile number or email address).
        - is_enabled: Flag indicating if the alert is active.
    """
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(Integer, ForeignKey("sensors.sensor_id"), nullable=False)#kun sensor ko alert ho ta vanne kura
    alert_type = Column(String, nullable=False)  # e.g., 'sms' or 'email'
    contact = Column(String, nullable=False)
    name=Column(String)
    Designation=Column(String)

    is_enabled = Column(Boolean, default=True, nullable=False)


class Sensor(Base):
    """
    Sensor table.

    Fields:
        - sensor_id: Primary Key.
        - sensor_name: Name of the sensor.
        - sensor_location: Location of the sensor.
        - station_id: Foreign Key linking to GeneralSetting.
    """
    __tablename__ = "sensors"

    sensor_id = Column(Integer, primary_key=True, index=True)
    sensor_name = Column(String, nullable=False)
    sensor_location = Column(String, nullable=True)
    station_id = Column(Integer, ForeignKey("general_settings.id"), nullable=False)



class SensorParameter(Base):
    """
    Sensor Parameters table.

    Fields:
        - id: Primary Key.
        - sensor_id: Foreign Key linking to Sensor.
        - parameter_code: Code identifier for the sensor parameter.
        - parameter_name: Name of the parameter.
        - unit: Unit of measurement.
        - upper_threshold: Maximum threshold value.
        - lower_threshold: Minimum threshold value.
        - logging_interval: Interval for logging data.
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



class ModbusSetting(Base):
    """
    Modbus Settings table.

    Fields:
        - id: Primary Key.
        - sensor_parameter_id: Foreign Key linking to SensorParameter.
        - slave_id: Slave ID.
        - function_code: Modbus function code.
        - register_address: Register address.
        - register_count: Number of registers.
        - variable: Variable name.
        - multiplier: Scaling multiplier.
        - offset: Offset value.
    """
    __tablename__ = "modbus_settings"

    id = Column(Integer, primary_key=True, index=True)
    sensor_parameter_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=False)
    slave_id = Column(Integer, nullable=False)
    function_code = Column(String, nullable=False)
    register_address = Column(Integer, nullable=False)
    register_count = Column(Integer, nullable=False)
    variable = Column(String, nullable=False)
    multiplier = Column(Float, nullable=False)
    offset = Column(Float, nullable=False)



class SensorData(Base):
    """
    Sensor Data table.

    Fields:
        - id: Primary Key.
        - sensor_parameter_id: Foreign Key linking to SensorParameter.
        - parameter: Parameter name.
        - value: Recorded value.
        - timestamp: Date and time when the data was recorded.
    """
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    sensor_parameter_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=False)
    parameter = Column(String, nullable=False)
    value = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
