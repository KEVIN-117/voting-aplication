const usersData = [
  {
    "id": "c2c5d2ef-8f7e-4aaf-bc85-5e8d55c6f71b",
    "email": "usuario1@example.com",
    "user_role": "USER",
    "password": "hashed_password_1"
  },
  {
    "id": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "email": "usuario2@example.com",
    "user_role": "USER",
    "password": "hashed_password_2"
  },
  {
    "id": "abcdef12-3456-7890-abcd-ef1234567890",
    "email": "admin@example.com",
    "user_role": "ADMIN",
    "password": "hashed_admin_password"
  }
]

const charactersData = [
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
    "description": "One of Harry Potter's best friends, a talented witch."
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
]

const votesData = [
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
]



export { usersData, charactersData, votesData }
