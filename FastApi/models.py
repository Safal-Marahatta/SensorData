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
from sqlalchemy import UniqueConstraint

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
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    designation = Column(String, nullable=False)
    mobile_number = Column(String, nullable=False)
    email = Column(String, nullable=False)
    alert_type = Column(String, nullable=False)  # Will store comma-separated values
    is_enabled = Column(Boolean, default=True, nullable=False)

    # Unique constraint for name + designation
    __table_args__ = (
        UniqueConstraint('name', 'designation', name='_name_designation_uc'),
    )


class Sensor(Base):
    """
    Sensor table.

    Fields:
        - sensor_id: Primary Key.
        - sensor_name: Name of the sensor.
        - sensor_location: Location of the sensor.
        - station_id: Foreign Key linking to GeneralSetting.
        - sensor_serial_number: The sensor's serial number.
        - bluetooth_code: Bluetooth code for the sensor.
        - gauge_height: Height of the sensor's gauge.
        - sensor_distance: Distance measurement from the sensor.
    """
    __tablename__ = "sensors"

    sensor_id = Column(Integer, primary_key=True, index=True)
    sensor_name = Column(String, nullable=False)
    sensor_location = Column(String, nullable=True)
    station_id = Column(Integer, nullable=False)
    
    # Additional fields
    sensor_serial_number = Column(String, nullable=True)
    bluetooth_code = Column(String, nullable=True)
    gauge_height = Column(Float, nullable=True)
    sensor_distance = Column(Float, nullable=True)



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
    variable = Column(String, nullable=True)
    parameter_name = Column(String, nullable=True)
    unit = Column(String, nullable=True)
    upper_threshold = Column(Float, nullable=True)
    lower_threshold = Column(Float, nullable=True)



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
    sensor_parameter_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=True)
    slave_id = Column(Integer, nullable=True)
    function_code = Column(String, nullable=True)
    register_address = Column(Integer, nullable=True)
    register_count = Column(Integer, nullable=True)
    variable = Column(String, nullable=True)
    multiplier = Column(Float, nullable=True)
    offset = Column(Float, nullable=True)



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
    sensor_parameter_id = Column(Integer, ForeignKey("sensor_parameters.id"), nullable=True)
    parameter = Column(String, nullable=True)
    value = Column(Float, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, nullable=True)
