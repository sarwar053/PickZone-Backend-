import { Sport } from "../../models/spots.js";

// get sports

export const getAllSports = async (req, res) => {
    try {
        const sports = await Sport.find().sort({ createdAt: -1 })
        res.json({ sports })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// create sport
export const createSport = async (req, res) => {
    try {
        const { sport, games, pickTypes } = req.body;

        const parsedGame = games ? JSON.parse(games) : [];
        const parsedPickTypes = pickTypes ? JSON.parse(pickTypes) : [];

        const teams = [];
        let index = 0;

        // NEW LOOP LOGIC: Handles both string keys and pre-parsed arrays
        while (true) {
            // Check for key 'teamNames[0]' OR if req.body.teamNames is an array and has index
            const name = req.body[`teamNames[${index}]`] || 
                         (req.body.teamNames && req.body.teamNames[index]);

            // If no name found at this index, we've reached the end of the list
            if (!name) break; 

            // Find the file in the Multer files array
            const logoFile = req.files?.find(
                f => f.fieldname === `teamLogos[${index}]`
            );

            teams.push({
                name: name,
                logo: logoFile ? logoFile.filename : "" // Use filename (lowercase)
            });

            index++;
        }

        const newSport = await Sport.create({
            sport,
            games: parsedGame,
            pickTypes: parsedPickTypes,
            teams
        });

        res.status(201).json({ message: "Sport created successfully", sport: newSport });

    } catch (err) {
        console.error("DEBUG - Body:", req.body);
        console.error("DEBUG - Files:", req.files);
        res.status(500).json({ message: "Error", error: err.message });
    }
}

// delete sport
export const deleteSport = async (req, res) => {
    try {
        const { id } = req.params
        const sport = await Sport.findByIdAndDelete(id)
        if (!sport) {
            return res.status(404).json({ message: "Sport not found" })
        }
        res.json({ message: "Sport deleted successfully" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
// add games to sport
export const addGames = async (req, res) => {
    try {
        const { games } = req.body
        const { id } = req.params

        if (!Array.isArray(games) || games.length === 0) {
            return res.status(400).json({ message: "Games are required" })
        }
        const sport = await Sport.findByIdAndUpdate(id,
            { $addToSet: { games: { $each: games.map((g) => g.trim()) } } },
            { new: true }
        )
        if (!sport) {
            return res.status(404).json({ message: "Sport not found" })
        }
        res.json({ message: "Games added successfully", sport })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// remove a specific game from a sport
export const removeGame = async (req, res) => {

    try {
        const { game } = req.body;
        if (!game) return res.status(400).json({ message: "game string is required." });

        const sport = await Sport.findByIdAndUpdate(
            req.params.id,
            { $pull: { games: game } },
            { new: true }
        );
        if (!sport) return res.status(404).json({ message: "Sport not found." });
        res.json({ sport });
    } catch (err) {
        res.status(500).json({ message: "Server error." });
    }

}

// add one or more teams to a sport
export const addTeams = async (req, res) => {
    try {
    const { teams } = req.body;
    if (!Array.isArray(teams) || teams.length === 0)
      return res.status(400).json({ message: "teams must be a non-empty array." });

    const sport = await Sport.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { teams: { $each: teams.map((t) => t.trim()) } } },
      { new: true }
    );
    if (!sport) return res.status(404).json({ message: "Sport not found." });
    res.json({ sport });
  } catch (err) {
    console.error("[admin:addTeams]", err);
    res.status(500).json({ message: "Server error." });
  }
}

// remove a specific team from a sport

export const removeTeam = async (req, res) => {
    try {
    const { team } = req.body;
    if (!team) return res.status(400).json({ message: "team string is required." });

    const sport = await Sport.findByIdAndUpdate(
      req.params.id,
      { $pull: { teams: team } },
      { new: true }
    );
    if (!sport) return res.status(404).json({ message: "Sport not found." });
    res.json({ sport });
  } catch (err) {
    console.error("[admin:removeTeam]", err);
    res.status(500).json({ message: "Server error." });
  }
}