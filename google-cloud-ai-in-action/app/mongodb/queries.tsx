import { Collection, Db, MongoClient } from "mongodb";
import { OrbitClassType, AsteroidType, AsteroidExtendedType } from "@/types/asteroid";

export const getOrbitClassTypes = async (): Promise<OrbitClassType[]> => {
    // Connect to MongoDB database
    const uri: string = process.env.MONGO_DB_CONNECTION_URI!;
    const client: MongoClient = new MongoClient(uri);
    try {
        await client.connect();

        // Fetch all orbit class types data
        const db: Db = client.db('asteroids');
        const collection: Collection<OrbitClassType> = db.collection('orbit_class_types');
        const orbitClassTypes: OrbitClassType[] = await collection.find({}).sort({name: 1}).toArray();
        return orbitClassTypes;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error getting orbit class types: ${error.message}`);
        }
        throw error;
    } finally {
        await client.close();
    }
}

export const getAsteroids = async (input: string = "", orbitClassType: string = ""): Promise<AsteroidExtendedType[]> => {
    // Connect to MongoDB database
    const uri: string = process.env.MONGO_DB_CONNECTION_URI!;
    const client: MongoClient = new MongoClient(uri);
    try {
        await client.connect();

        // Get orbit class types
        const orbitClassTypes: OrbitClassType[] = await getOrbitClassTypes();

        // Dynamically build query
        const query: Record<string, unknown> = {};
        if (input.trim()) {
            query.name = { $regex: input.trim(), $options: "i" };
        }
        if (orbitClassType.trim()) {
            query.orbit_class_type = orbitClassType.trim();
        }

        // Fetch all asteroid data
        const db: Db = client.db('asteroids');
        const collection: Collection<AsteroidType> = db.collection('asteroids');
        const asteroidsTemp: AsteroidType[] = await collection.find(query).sort({ name: 1 }).toArray();
        const asteroids: AsteroidExtendedType[] = asteroidsTemp.map((asteroid: AsteroidType) => {
            return {
                ...asteroid,
                orbit_class_type: orbitClassTypes.filter((orbitClassType: OrbitClassType) => orbitClassType._id === asteroid.orbit_class_type)[0]
            }
        });
        return asteroids;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error getting asteroids: ${error.message}`);
        }
        throw error;
    } finally {
        await client.close();
    }
}