/*CREATE DATABASE "BurgerStone"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Ecuador.1252'
    LC_CTYPE = 'Spanish_Ecuador.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
*/

DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(100) not NULL UNIQUE,
	imagen VARCHAR (255) NULL,
	ruta VARCHAR (255) NULL,
	creacion_fecha TIMESTAMP (0) NOT NULL,
	update_fecha TIMESTAMP (0) NOT NULL
);

INSERT INTO roles(
	nombre, 
	ruta,
	creacion_fecha,
	update_fecha
)
VALUES(
	'CLIENTE',
	'client/products/list',
	'2022/06/21',
	'2022/06/21'
);

INSERT INTO roles(
	nombre, 
	ruta,
	creacion_fecha,
	update_fecha
)
VALUES(
	'RESTAURANTE',
	'restaurant/orders/list',
	'2022/06/21',
	'2022/06/21'
);

INSERT INTO roles(
	nombre, 
	ruta,
	creacion_fecha,
	update_fecha
)
VALUES(
	'REPARTIDOR',
	'delivery/orders/list',
	'2022/06/21',
	'2022/06/21'
);

DROP TABLE IF EXISTS usuario CASCADE;
CREATE TABLE usuario(
	id BIGSERIAL PRIMARY KEY,
	cedula VARCHAR(10) NOT NULL UNIQUE, 
	email VARCHAR(255) NOT NULL UNIQUE,
	nombre VARCHAR (255) NOT NULL,
	apellido VARCHAR (255) NOT NULL,
	telefono VARCHAR (80) NOT NULL UNIQUE,
	imagen VARCHAR (255)  NULL,
	password VARCHAR (255) NOT NULL,
	disponible BOOLEAN NULL,
	session_token VARCHAR (255) NULL,
	creacion_fecha TIMESTAMP (0) NOT NULL,
	update_fecha TIMESTAMP (0) NOT NULL
);

DROP TABLE IF EXISTS usuarioRoles CASCADE;
CREATE TABLE usuarioRoles(
	id_usuario BIGINT NOT NULL,
	id_rol BIGINT NOT NULL,
	creacion_fecha TIMESTAMP (0) NOT NULL,
	update_fecha TIMESTAMP (0) NOT NULL,
	PRIMARY KEY(id_usuario, id_rol),	
	FOREIGN KEY(id_usuario) REFERENCES usuario(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS direccion CASCADE;
CREATE TABLE direccion(
	id BIGSERIAL PRIMARY KEY,
	id_usuario BIGINT NOT NULL,
	direccion VARCHAR(255),
	vecindario VARCHAR(255),
	latitud DECIMAL DEFAULT 0,
	longitud DECIMAL DEFAULT 0,
	creacion_fecha TIMESTAMP (0) NOT NULL,
	update_fecha TIMESTAMP (0) NOT NULL,
	FOREIGN KEY(id_usuario) REFERENCES usuario(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS orden CASCADE;
CREATE TABLE orden(
	id BIGSERIAL PRIMARY KEY,
	id_cliente BIGINT NOT NULL,
	id_repartidor BIGINT NOT NULL,
	id_direccion BIGINT NOT NULL,
	latitud DECIMAL DEFAULT 0,
	longitud DECIMAL DEFAULT 0,
	status VARCHAR(90) NOT NULL,
	timestamp BIGINT NOT NULL,
	creacion_fecha TIMESTAMP (0) NOT NULL,
	update_fecha TIMESTAMP (0) NOT NULL,
	FOREIGN KEY(id_cliente) REFERENCES usuario(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_repartidor) REFERENCES usuario(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_direccion) REFERENCES usuario(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS categorias CASCADE;
CREATE TABLE categorias(
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(180),
	descripcion VARCHAR(255),
	creacion_fecha TIMESTAMP (0) NOT NULL,
	update_fecha TIMESTAMP (0) NOT NULL	
);

DROP TABLE IF EXISTS producto CASCADE;
CREATE TABLE producto(
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR (180),
	descripcion VARCHAR (255),
	precio DECIMAL DEFAULT 0,
	imagen1 VARCHAR (255) NOT NULL,
	imagen2 VARCHAR (255)  NULL,
	imagen3 VARCHAR (255)  NULL,
	id_categoria BIGINT,
	creacion_fecha TIMESTAMP (0) NOT NULL,
	update_fecha TIMESTAMP (0) NOT NULL,
	FOREIGN KEY(id_categoria) REFERENCES categorias(id) ON UPDATE CASCADE ON DELETE CASCADE

);

DROP TABLE IF EXISTS orden_Producto CASCADE;
CREATE TABLE orden_Producto(
	id_orden BIGINT NOT NULL,
	id_producto BIGINT NOT NULL,
	cantidad BIGINT NOT NULL,
	creacion_fecha TIMESTAMP (0) NOT NULL,
	update_fecha TIMESTAMP (0) NOT NULL,
	PRIMARY KEY(id_orden, id_producto),	
	FOREIGN KEY(id_orden) REFERENCES orden(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_producto) REFERENCES Producto(id_producto) ON UPDATE CASCADE ON DELETE CASCADE
);