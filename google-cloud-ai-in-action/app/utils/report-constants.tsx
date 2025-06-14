import { AsteroidExtendedType } from "@/app/types/asteroid";

// Constants for PDF reports
export const reportConstants = {
    startYear: 2025,
    brandName: "Asteroid Collection",
    tagLine: "Informing the public of asteroids in our galaxy"
}
export const reportContentTemp: string = `Asteroids, often referred to as minor planets, are remnants from the solar system's formation, rocky and metallic bodies orbiting the Sun primarily in the asteroid belt between Mars and Jupiter. These celestial objects offer valuable insights into the early solar system's composition and conditions, as they have remained relatively unchanged since their formation billions of years ago. Studying asteroids allows scientists to piece together the building blocks of planets and understand the processes that led to the diverse planetary system we observe today. Their compositions vary widely, ranging from carbonaceous materials to metallic iron and nickel, reflecting the different regions of the protoplanetary disk where they originated.\n\nAmong the vast population of asteroids, one specific object, designated 144861 (2004 LA12), holds particular interest due to its orbital characteristics and physical properties. Discovered in 2002 and meticulously tracked through observations spanning over two decades, this asteroid provides a rich dataset for analysis. With an absolute magnitude (H) of 15.41, it allows estimations of its size, and its orbital path places it in the Apollo class, making it an object of interest for understanding Earth-crossing asteroids. Its study contributes to a broader understanding of near-Earth objects (NEOs) and their potential impact risks.\n\nThe estimated diameter of 144861 (2004 LA12) ranges from 2.20 kilometers to 4.92 kilometers. This size range is determined based on its absolute magnitude and an assumed albedo (reflectivity), a parameter that is difficult to determine precisely without more direct observations. The wide diameter estimate indicates uncertainty regarding the true albedo of the asteroid's surface; a darker, less reflective surface would imply a larger diameter, while a brighter, more reflective surface would suggest a smaller diameter. This highlights the challenges in characterizing asteroids based solely on their brightness and orbital parameters.\n\nWhat makes 144861 (2004 LA12) particularly noteworthy is its classification as an Apollo-class asteroid. Apollo asteroids are a group of near-Earth objects whose orbits cross Earth's orbit and whose semi-major axes are greater than 1 astronomical unit (AU), the average distance between Earth and the Sun. In the case of 144861 (2004 LA12), its semi-major axis is approximately 2.51 AU, placing it well within the definition of an Apollo asteroid. Furthermore, its inclination, which measures the tilt of its orbit relative to Earth's orbital plane, is notably high at 39.4 degrees. This high inclination is a factor contributing to its classification, along with its semi-major axis.\n\nThe orbit determination date of 144861 (2004 LA12) most recently updated on March 1st, 2025, is a crucial parameter indicating the precision of the asteroid's orbital calculations. This date reflects the most recent set of observations used to refine the asteroid's trajectory. A later determination date typically implies a more accurate and refined orbit, reducing uncertainties in future predictions. Despite its Apollo classification, 144861 (2004 LA12) is explicitly classified as \"not potentially hazardous,\" indicating that its calculated orbit does not pose a significant impact threat to Earth within the foreseeable future, although constant monitoring is still essential. Understanding the characteristics of asteroids like 144861 (2004 LA12) is critical for planetary defense efforts. It allows scientists to identify, track, and characterize near-Earth objects, enhancing our ability to predict and mitigate potential impact risks.\n`;
export const asteroid: AsteroidExtendedType = {
    _id: "2144861",
    name: "144861 (2004 LA12)",
    absolute_magnitude_h: 15.41,
    estimated_diameter_min: 2.2006702711,
    estimated_diameter_max: 4.9208483223,
    is_potentially_hazardous: false,
    orbit_id: "159",
    orbit_determination_date: "2025-03-01 05:16:48",
    first_observation_date: "2002-03-12 00:00:00",
    last_observation_date: "2025-03-01 00:00:00",
    semi_major_axis: 2.509284983950943,
    inclination: 39.40474883826569,
    orbit_class_type: {
        _id: "bfcec887-7e5b-4ad0-8000-25ed81ce4b02",
        abbreviation: "APO",
        name: "Appollo-class Asteroid",
        description: "These asteroids have orbits that cross the Earth's orbit and have a semi-major axis greater than 1 AU.",
        colour: "#F54242"
    }
}

