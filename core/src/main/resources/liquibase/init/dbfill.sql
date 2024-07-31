INSERT INTO "user" (username, email, password, role) VALUES
                                                         ('admin', 'admin@example.com', 'admin123', 'admin'),
                                                         ('user1', 'user1@example.com', 'password1', 'employee'),
                                                         ('user2', 'user2@example.com', 'password2', 'employee'),
                                                         ('hr1', 'hr1@example.com', 'password3', 'hr');
INSERT INTO hr (user_id, company_name) VALUES
                                           (1, 'Company A'),
                                           (2, 'Company B');
INSERT INTO joboffer (hr_id, title, description, location, salary, expiration_date, status) VALUES
                                                                                                (3, 'Software Engineer', 'We are hiring a software engineer with experience in web development.', 'New York', 70000.00, '2024-05-01', 'active'),
                                                                                                (4, 'Marketing Specialist', 'We are seeking a marketing specialist to join our team.', 'Los Angeles', 60000.00, '2024-04-30', 'active');
INSERT INTO application (user_id, joboffer_id, application_date, status) VALUES
                                                                             (2, 3, CURRENT_TIMESTAMP, 'pending'),
                                                                             (3, 4, CURRENT_TIMESTAMP, 'pending');
