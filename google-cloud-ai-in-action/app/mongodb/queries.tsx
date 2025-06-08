import { Collection, Db, MongoClient, WithId } from "mongodb";
import { AsteroidType } from "@/app/types/asteroid";

export const getAsteroids = async (): Promise<AsteroidType[]> => {
    // Connect to MongoDB database
    const uri: string = process.env.MONGO_DB_CONNECTION_URI!;
    const client: MongoClient = new MongoClient(uri);
    try {
        await client.connect();

        // Fetch all asteroid data
        const db: Db = client.db('asteroids');
        const collection: Collection<AsteroidType> = db.collection('asteroids');
        const asteroidDocs: AsteroidType[] = await collection.find({}).toArray();
        return asteroidDocs;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Error getting asteroids: ${error.message}`);
        }
        throw error;
    } finally {
        await client.close();
    }
}