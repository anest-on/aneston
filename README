Construir container no docker:
docker run --name aneston -e POSTGRES_PASSWORD=docker -p 5432:5432 postgres:latest

Colocar no .env:
DATABASE_URL='mysql://root:docker@localhost:3306/aneston'

Atualizar migration:
npx prisma migrate dev

Abrir Prisma no Browser:
npx prisma studio