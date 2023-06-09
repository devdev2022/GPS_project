-- migrate:up
CREATE TABLE reservation_driver (
  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  RESERVATION_ID INT NOT NULL,
  DRIVER_ID INT NOT NULL,
  FOREIGN KEY (RESERVATION_ID) REFERENCES RESERVATION(ID),
  FOREIGN KEY (DRIVER_ID) REFERENCES DRIVER(ID)
)

-- migrate:down
DROP TABLE reservation_driver
