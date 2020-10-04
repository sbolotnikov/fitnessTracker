const db = require("../models");

module.exports = function (app) {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}, (error, data) => {
            if (error) {
                res.status(404).send(error);
            } else {
                res.send(data);
            }
        }
        );
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}, (error, data) => {
            if (error) {
                res.status(404).send(error);
            } else {
                res.send(data);
            }
        }
        );
    });

    app.post("/api/workouts", (req, res) => {
        let today = new Date();
        // create new workout as of today, and exercise[] is empty
        db.Workout.create({ day: today })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(404).json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate(req.params.id, {$push:{exercises:req.body}},{new: true, runValidators:true }, (error, data) => {
          if (error) {
            res.status(404).send(error);
          } else {
            // check body if get through and update data
            res.send(data);
          }
        }
        );
    });
};