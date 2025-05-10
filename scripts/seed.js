import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const USERS_COUNT = 50;
const FOLLOWS_PER_USER = 5;
const BLOCKS_PER_USER = 2;
const VERIFIED_PERCENTAGE = 0.8;

async function main() {
    console.log(`Starting database seeding...`);

    // Create users with their streams
    const users = [];
    for (let i = 0; i < USERS_COUNT; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const name = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;

        const email = faker.internet.email({ firstName, lastName }).toLowerCase();
        const hashedPassword = await bcrypt.hash("password123", 10);

        const isVerified = Math.random() < VERIFIED_PERCENTAGE;
        const emailVerified = isVerified ? faker.date.past() : null;

        const bio = faker.helpers.arrayElement([
            faker.lorem.paragraph(),
            `${faker.person.jobTitle()} | ${faker.lorem.sentence()}`,
            `Streaming ${faker.helpers.arrayElement(['Minecraft', 'Fortnite', 'Valorant', 'League of Legends', 'Just Chatting', 'Art'])}`,
            null
        ]);

        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    emailVerified,
                    bio,
                    image: Math.random() > 0.3 ? faker.image.avatarGitHub() : "/default.png",
                    stream: {
                        create: {
                            name: faker.helpers.arrayElement([
                                `${firstName}'s Stream`,
                                `${name} live`,
                                faker.lorem.words({ min: 2, max: 4 })
                            ]),
                            thumbnailUrl: Math.random() > 0.5 ?
                                `https://picsum.photos/seed/${faker.string.alphanumeric(10)}/${faker.number.int({ min: 800, max: 1200 })}/${faker.number.int({ min: 450, max: 675 })}` : null,
                            isChatEnabled: Math.random() > 0.1,
                            isChatDelayed: Math.random() < 0.3,
                            isChatFollowersOnly: Math.random() < 0.4,
                        }
                    }
                }
            });

            users.push(user);
            console.log(`Created user: ${name}`);
        } catch (error) {
            console.error(`Failed to create user ${name}:`, error);
        }
    }

    // Create follow relationships
    console.log('Creating follow relationships...');

    for (const user of users) {
        const otherUsersF = users.filter(u => u.id !== user.id);
        const followCount = Math.min(
            Math.floor(Math.random() * FOLLOWS_PER_USER) + 1,
            otherUsersF.length
        );
        const otherUsersB = otherUsersF.filter(u => u.id !== user.id);
        const blockCount = Math.min(
            Math.floor(Math.random() * BLOCKS_PER_USER) + 1,
            otherUsersB.length
        );

        const usersToFollow = faker.helpers.arrayElements(otherUsersF, followCount);
        const usersToBlock = faker.helpers.arrayElements(otherUsersB, blockCount);

        for (const followUser of usersToFollow) {
            try {
                await prisma.follow.create({
                    data: {
                        followerId: user.id,
                        followingId: followUser.id,
                    }
                });
                console.log(`${user.name} now follows ${followUser.name}`);
            } catch (error) {
                console.error(`Failed to create follow relationship:`, error);
            }
        }

        for (const blockUser of usersToBlock) {
            try {
                await prisma.block.create({
                    data: {
                        blockerId: user.id,
                        blockedId: blockUser.id,
                    }
                });
                console.log(`${user.name} blocked ${blockUser.name}`);
            } catch (error) {
                console.error(`Failed to create block relationship:`, error);
            }
        }
    }

    console.log(`Seeding completed. Created ${users.length} users with streams, follows, and blocks.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });