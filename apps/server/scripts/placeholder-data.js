"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminData = exports.clientData = exports.commentsData = exports.votesData = exports.charactersData = exports.usersData = void 0;
var usersData = [
    {
        "id": "c2c5d2ef-8f7e-4aaf-bc85-5e8d55c6f71b",
        "email": "usuario1@example.com",
        "user_role": "VOTER",
        "password": "c%VrGH9wEi#dr5"
    },
    {
        "id": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        "email": "usuario2@example.com",
        "user_role": "VOTER",
        "password": "aynG$mZYH7sc!H"
    },
    {
        "id": "abcdef12-3456-7890-abcd-ef1234567890",
        "email": "admin@example.com",
        "user_role": "ADMIN",
        "password": "T3pHszYqM^h7mM"
    }
];
exports.usersData = usersData;
var charactersData = [
    {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Gandalf",
        "description": "A wise and powerful wizard from Middle-earth."
    },
    {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "name": "Frodo Baggins",
        "description": "A hobbit who undertakes the quest to destroy the One Ring."
    },
    {
        "id": "78901234-5678-9012-3456-789012345600",
        "name": "Aragorn",
        "description": "The rightful heir to the throne of Gondor, known as Strider."
    },
    {
        "id": "abcdef12-3456-7890-abcd-ef1234567890",
        "name": "Darth Vader",
        "description": "Former Jedi Knight who turned to the dark side."
    },
    {
        "id": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        "name": "Harry Potter",
        "description": "The Boy Who Lived, famous wizard in the wizarding world."
    },
    {
        "id": "c2c5d2ef-8f7e-4aaf-bc85-5e8d55c6f71b",
        "name": "Jon Snow",
        "description": "A prominent character in the Game of Thrones series."
    },
    {
        "id": "f0f1f2f3-f4f5-f6f7-f8f9-fafbfdfef0f1",
        "name": "Luke Skywalker",
        "description": "Jedi Knight who helped defeat the Galactic Empire."
    },
    {
        "id": "00112233-4455-6677-8899-aabbccddeeff",
        "name": "Hermione Granger",
        "description": "One of Harry Potter-s best friends, a talented witch."
    },
    {
        "id": "99887766-5544-3322-1100-0a0b0c0d0e0f",
        "name": "Sherlock Holmes",
        "description": "Famous detective known for his brilliant deductive reasoning."
    },
    {
        "id": "22222222-2222-2222-2222-222222222222",
        "name": "Spider-Man",
        "description": "A superhero with spider-like abilities."
    }
];
exports.charactersData = charactersData;
var votesData = [
    {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "user_id": usersData[0].id,
        "character_id": charactersData[0].id,
        "vote_value": 1
    },
    {
        "id": "550e8400-e29b-41d4-a716-446655440002",
        "user_id": usersData[1].id,
        "character_id": charactersData[1].id,
        "vote_value": 0
    },
    {
        "id": "550e8400-e29b-41d4-a716-446655440003",
        "user_id": usersData[2].id,
        "character_id": charactersData[2].id,
        "vote_value": 1
    },
    {
        "id": "550e8400-e29b-41d4-a716-446655440004",
        "user_id": usersData[0].id,
        "character_id": charactersData[0].id,
        "vote_value": 0
    },
    {
        "id": "550e8400-e29b-41d4-a716-446655440005",
        "user_id": usersData[1].id,
        "character_id": charactersData[1].id,
        "vote_value": 1
    },
    {
        "id": "550e8400-e29b-41d4-a716-446655440006",
        "user_id": usersData[2].id,
        "character_id": charactersData[2].id,
        "vote_value": 1
    },
    {
        "id": "550e8400-e29b-41d4-a716-446655440007",
        "user_id": usersData[0].id,
        "character_id": charactersData[0].id,
        "vote_value": 0
    },
    {
        "id": "550e8400-e29b-41d4-a716-446655440008",
        "user_id": usersData[1].id,
        "character_id": charactersData[1].id,
        "vote_value": 1
    },
    {
        "id": "550e8400-e29b-41d4-a716-446655440009",
        "user_id": usersData[2].id,
        "character_id": charactersData[2].id,
        "vote_value": 0
    },
    {
        "id": "550e8400-e29b-41d4-a716-446655440010",
        "user_id": usersData[0].id,
        "character_id": charactersData[0].id,
        "vote_value": 1
    }
];
exports.votesData = votesData;
var commentsData = [
    {
        "id": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        "user_id": usersData[0].id,
        "votes_id": votesData[0].id,
        "comment": "Gandalf is my favorite character because of his wisdom."
    },
    {
        "id": "550e8400-e29b-41d4-a716-446655440011",
        "user_id": usersData[1].id,
        "votes_id": votesData[1].id,
        "comment": "Frodo-s journey is very inspiring."
    },
    {
        "id": "123e4567-e89b-12d3-a456-426614174011",
        "user_id": usersData[2].id,
        "votes_id": votesData[2].id,
        "comment": "Aragorn is a true leader and hero."
    },
    {
        "id": "78901234-5678-9012-3456-789012345611",
        "user_id": usersData[0].id,
        "votes_id": votesData[0].id,
        "comment": "Darth Vader-s character arc is fascinating."
    },
    {
        "id": "abcdef12-3456-7890-abcd-ef1234567890",
        "user_id": usersData[1].id,
        "votes_id": votesData[1].id,
        "comment": "Harry Potter-s bravery is commendable."
    },
    {
        "id": "f0f1f2f3-f4f5-f6f7-f8f9-fafbfdfef0f1",
        "user_id": usersData[2].id,
        "votes_id": votesData[2].id,
        "comment": "Jon Snow-s story is very compelling."
    },
    {
        "id": "00112233-4455-6677-8899-aabbccddeeff",
        "user_id": usersData[0].id,
        "votes_id": votesData[0].id,
        "comment": "Luke Skywalker is a great hero."
    },
    {
        "id": "99887766-5544-3322-1100-0a0b0c0d0e0f",
        "user_id": usersData[1].id,
        "votes_id": votesData[1].id,
        "comment": "Hermione Granger is incredibly smart and talented."
    },
    {
        "id": "22222222-2222-2222-2222-222222222222",
        "user_id": usersData[2].id,
        "votes_id": votesData[2].id,
        "comment": "Sherlock Holmes-s deductive skills are unmatched."
    },
    {
        "id": "33333333-3333-3333-3333-333333333333",
        "user_id": usersData[0].id,
        "votes_id": votesData[0].id,
        "comment": "Spider-Man-s agility and spider-sense make him a unique superhero."
    }
];
exports.commentsData = commentsData;
var clientData = [
    {
        "id": "e3a1c3e8-1234-5678-90ab-cdef12345678",
        "name": "John",
        "last_name": "Doe",
        "birth_day": "1985-04-12",
        "address": "123 Main St",
        "user_id": usersData[0].id
    },
    {
        "id": "f1a2b3c4-5678-90ab-cdef-1234567890ab",
        "name": "Jane",
        "last_name": "Smith",
        "birth_day": "1990-11-23",
        "address": "456 Elm St",
        "user_id": usersData[1].id
    }
];
exports.clientData = clientData;
var adminData = [
    {
        "id": "d4e5f6a7-8901-2345-6789-abcdef012345",
        "name": "Alice",
        "last_name": "Johnson",
        "birth_day": "1982-07-19",
        "address": "789 Oak St",
        "user_id": usersData[2].id,
        "phone_number": "+1234567890"
    }
];
exports.adminData = adminData;
