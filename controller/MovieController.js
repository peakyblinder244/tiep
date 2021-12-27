export default {
  getMovie: async (req, res) => {
    if (!req.user) {
      res.redirect("/login");

      return;
    }
    console.log("hihi");
    console.log(req.user);
    res.render("movie");
  },

  getMovieDetails: async (req, res) => {
    if (req.user == null) {
      res.redirect("/login");
      return;
    }
    res.render("movie-details");
  },
};
