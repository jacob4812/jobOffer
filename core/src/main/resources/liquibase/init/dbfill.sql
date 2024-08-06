INSERT INTO "user" (username, email,login, password, userRole)
VALUES ('admin', 'admin@example.com','administ', 'admin123', 'admin'),
       ('user1', 'user1@example.com','user1', 'password1', 'employee'),
       ('user2', 'user2@example.com','user2', 'password2', 'employee'),
       ('hr1', 'hr1@example.com','hr1', 'password3', 'hr');
INSERT INTO offer (title, description, location, salary, expiration_date, status)
VALUES ('Software Engineer', 'We are hiring a software engineer with experience in web development.', 'New York',
        70000.00, '2024-05-01', 'active'),
       ('Marketing Specialist', 'We are seeking a marketing specialist to join our team.', 'Los Angeles', 60000.00,
        '2024-04-30', 'active');
