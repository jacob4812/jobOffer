CREATE TABLE userTable (
                        id SERIAL PRIMARY KEY,
                        login VARCHAR(50) NOT NULL,
                        email VARCHAR(100) NOT NULL,
                        password VARCHAR(100) NOT NULL,
                        user_role VARCHAR(20) DEFAULT 'admin' )
CREATE TABLE offer (
                       id SERIAL PRIMARY KEY,
                       company VARCHAR(255),
                       title VARCHAR(100) NOT NULL,
                       location VARCHAR(100),
                       contract_type VARCHAR(50),
                       salary NUMERIC(10, 2),
                       expiration_date DATE,
                       description TEXT NOT NULL,
                       status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'notActive'))
);