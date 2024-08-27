// Dependencies
const router = require("express").Router();

const Zones = require("./zones");
const Groups = require("./groups");
const MusicLibrary = require("./musicLibrary");
const LibraryDetail = require("./libraryDetail");
const SpotifyRoutes = require("./services/spotify");

const Spotify = require("../plugins/Spotify");

module.exports = function Routes(sonosNetwork) {
  this.router = router;
  this.sonosNetwork = sonosNetwork;
  this.spotify = new Spotify(this.sonosNetwork);

  // All router
  const zones = new Zones(this.sonosNetwork);
  const groups = new Groups(this.sonosNetwork);
  const musicLibrary = new MusicLibrary(this.sonosNetwork);
  const libraryDetail = new LibraryDetail(this.sonosNetwork);
  const spotifyRoutes = new SpotifyRoutes(this.spotify);

  this.router.use("/api/zones", zones.router);
  this.router.use("/api/groups", groups.router);
  this.router.use("/api/library", musicLibrary.router);
  this.router.use("/api/detail", libraryDetail.router);
  this.router.use("/api/spotify", spotifyRoutes.router);
  // End All router

  if (process.env.NODE_ENV !== "production") {
    // send 404 error message
    this.router.get("*", (req, res) => {
      console.log("404");
      res.status(404).send({ status: "404", message: "endpoint not found" });
    });
  }
};
