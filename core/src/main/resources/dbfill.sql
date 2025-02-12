CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO user_table (email, login, password,name,surname, user_role)
VALUES
    ('admin@example.com', 'administ', crypt('Admin123@', gen_salt('bf')),null,null, 'ADMIN'),
    ('user1@example.com', 'user1', crypt('Password1@', gen_salt('bf')),null,null, 'EMPLOYEE'),
    ('user2@example.com', 'user2', crypt('Password2@', gen_salt('bf')),null,null, 'EMPLOYEE'),
    ('hr1@example.com', 'hr1', crypt('Password3@', gen_salt('bf')),null,null, 'HR');
INSERT INTO company (id,company_name, nip, email, password, phone_number, user_role)
VALUES
(1,'Firma #1', 1234567894, 'firma1@example.com', crypt('Zaq1234@', gen_salt('bf')), 123456789, 'COMPANY'),
(2,'Firma #2', 9876543215, 'firma2@example.com', crypt('Zaq1234', gen_salt('bf')), 987654321, 'COMPANY'),
(3,'Firma #3', 9876543214, 'firma3@example.com', crypt('Zaq1234', gen_salt('bf')), 987654321, 'COMPANY'),
(4,'Firma #4', 9876543213, 'firma4@example.com', crypt('Zaq1234', gen_salt('bf')), 987654321, 'COMPANY'),
(5,'Firma #5', 9876543216, 'firma5@example.com', crypt('Zaq1234', gen_salt('bf')), 987654321, 'COMPANY');

INSERT INTO offer (company_id, title, location, contract_type, salary_min,salary_max, expiration_date, description, offer_experience, offer_position, offer_technology)
VALUES
    (1, 'Angular Developer', 'Warszawa', 'Kontrakt B2B', 40000.00,50000.00, '2024-05-01',
        'About the Company: We are proud to be working with a leading provider of financial services, known for their innovative approach in helping businesses transform and grow. As a trusted partner, our client is committed to developing cutting-edge technologies to improve the overall customer experience while ensuring operational efficiency. The company has a strong focus on providing its employees with continuous growth opportunities and a work environment that fosters collaboration and creative problem-solving. Join our team and become part of a thriving global community.

        About the Role: As an Angular Developer, you will be instrumental in the modernization of our client\ Customer Relationship Management (CRM) system, which serves millions of customers worldwide. You will be working with a team of highly skilled professionals to develop high-quality, user-friendly Angular applications that improve business processes, enhance the customer experience, and provide a stable foundation for the company\ growth. This position offers a unique opportunity to be part of a strategic project that will significantly impact the financial services industry.

        Your Responsibilities:
        - Develop and implement new features and functionalities within the Angular framework to enhance the CRM system.
        - Write clean, efficient, and maintainable code that adheres to industry best practices.
        - Collaborate with cross-functional teams, including designers, product managers, and QA specialists, to ensure successful project delivery.
        - Engage in code reviews, providing constructive feedback to other developers and continuously improving the codebase.
        - Identify and troubleshoot technical issues, ensuring that the applications run smoothly and efficiently.
        - Contribute to the continuous improvement of development processes, best practices, and the overall software development lifecycle.
        - Maintain and update technical documentation to ensure the clarity of project progress and implementation details.

        Our Requirements:
        - Strong programming skills in TypeScript, with a deep understanding of object-oriented programming concepts.
        - Proficiency with Angular 18+ framework, including components, services, modules, routing, and state management.
        - Solid experience with Bootstrap 5 framework for responsive and user-friendly interface design.
        - Proficiency in HTML, CSS, and JavaScript, with an eye for detail and quality UI implementation.
        - Experience with unit testing and Test-Driven Development (TDD) to ensure code quality and reliability.
        - Strong problem-solving and debugging skills to resolve issues in a timely manner.
        - Experience working in Agile development environments (Scrum) and familiarity with Agile methodologies.
        - A passion for continuous learning and keeping up-to-date with the latest trends and technologies in the development world.

        How We Organize Our Work: We work in an Agile Scrum environment, where collaboration, flexibility, and iterative progress are key to our success. The development team is dedicated to delivering high-quality software with fast feedback loops, enabling you to make continuous improvements throughout the development lifecycle. We believe in a Test-Driven Development (TDD) approach, ensuring that quality is built into every aspect of our projects from the very beginning.

        What We Offer:
        - Stable and long-term cooperation with excellent conditions and benefits.
        - Opportunities to enhance your skills and grow your expertise in the dynamic and impactful financial industry.
        - Work on some of the most strategic and exciting projects available in the market today.
        - Define your career roadmap and develop yourself by delivering significant projects for various clients over several years.
        - Be part of an international team, with access to social events, training sessions, and a collaborative work environment.
        - Attractive Medical Package for your peace of mind and well-being.
        - Access to the Multisport Program, encouraging a healthy work-life balance.
        - Pluralsight subscription to help you keep growing your technical expertise with an extensive library of online courses.
        - Flexible working hours and the option to work remotely, enabling you to balance your personal and professional life effectively.',
        '{"MID", "SENIOR"}', '{"FRONTEND"}', '{"ANGULAR", "TYPESCRIPT", "BOOTSTRAP"}'),
    (2, 'IT Specialist', 'Gniezno', 'Kontrakt B2B', 40000.00,50000.00, '2024-04-30', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '{"MID"}','{"BACKEND"}','{"JAVA", "SPRING"}'),
    (5, 'Java Developer', 'Lublin', 'Umowa o pracę', 60000.00,70000.00, '2024-04-30', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '{"MID", "SENIOR"}','{"BACKEND"}','{"JAVA", "SPRING"}'),
    (1, 'IT Specialist', 'Gniezno', 'Kontrakt B2B', 50000.00,60000.00, '2024-04-30', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '{"MID"}','{"BACKEND"}','{"JAVA", "SPRING"}'),
    (4, 'Frontend Developer', 'Kraków', 'Kontrakt B2B', 55000.00,65000.00, '2024-06-15', 'Looking for a skilled frontend developer with React experience.', '{"JUNIOR", "MID"}','{"BACKEND"}','{"JAVA", "SPRING"}'),
    (1, 'Backend Developer', 'Wrocław', 'Umowa o pracę', 65000.00,75000.00, '2024-07-01', 'Seeking an experienced backend developer for our growing team.', '{"MID", "SENIOR"}','{"BACKEND"}','{"JAVA", "SPRING"}'),
    (2, 'Data Scientist', 'Warszawa', 'Kontrakt B2B', 70000.00,80000.00, '2024-05-20', 'Join us as a data scientist to help analyze big data and drive business insights.', '{"MID", "SENIOR"}','{"BACKEND"}','{"JAVA", "SPRING"}'),
    (1, 'UX/UI Designer', 'Gdańsk', 'Umowa o pracę', 60000.00,70000.00, '2024-05-25', 'We need a creative UX/UI designer to enhance user experience for our products.', '{"JUNIOR", "MID"}','{"BACKEND"}','{"JAVA", "SPRING"}'),
    (2, 'Product Manager', 'Poznań', 'Kontrakt B2B', 75000.00,85000.00, '2024-06-01', 'Experienced product manager needed to lead product development and strategy.', '{"MID", "SENIOR"}','{"BACKEND"}','{"JAVA", "SPRING"}'),
    (1, 'System Administrator', 'Szczecin', 'Umowa o pracę', 50000.00,70000.00, '2024-05-15', 'Responsible for maintaining and managing our IT infrastructure.', '{"MID"}','{"BACKEND"}','{"JAVA", "SPRING"}'),
    (3, 'Business Analyst', 'Katowice', 'Kontrakt B2B', 55000.00,65000.00, '2024-07-10', 'Looking for a business analyst to work on project requirements and process improvements.', '{"MID"}','{"BACKEND"}','{"JAVA", "SPRING"}'),
    (1, 'Network Engineer', 'Bydgoszcz', 'Umowa o pracę', 58000.00, 68000.00, '2024-06-05', 'Join our team as a network engineer to manage and optimize network systems.', '{"MID"}','{"BACKEND"}','{"JAVA", "SPRING"}'),
    (4, 'Software Architect', 'Lublin', 'Kontrakt B2B', 80000.00,90000.00, '2024-07-20', 'Seeking a software architect to design scalable and efficient software solutions.', '{"SENIOR"}','{"BACKEND"}','{"JAVA", "SPRING"}'),
    (1, 'Digital Marketer', 'Rzeszów', 'Umowa o pracę', 52000.00,62000.00, '2024-06-30', 'Looking for a digital marketer to drive online marketing campaigns and strategies.', '{"JUNIOR", "MID"}','{"BACKEND"}','{"JAVA", "SPRING"}');
