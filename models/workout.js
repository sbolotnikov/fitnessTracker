const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// setting schema for our workout database
const WorkoutSchema = new Schema({
  day: {
    type: Date,

  },
  exercises:
    [

      {
        type: {
          type: String,
          enum: ["resistance", "cardio"]
        },
        name: {
          type: String,
          minlength: [1, 'Should be more then 1'],
          unique: true
        },
        duration: {
          type: Number,
          min: [1, 'duration should be more then 1 minute'],
        },

        distance: {
          type: Number,
          min: [0, 'distance should be more then 0 miles'],
          required: function () { return this.type === "cardio"; }

        },
// required defines necessary fields for diffrent type of workouts

        weight: {
          type: Number,
          min: [0, 'Weight should be more then 0 pounds'],
          required: function () { return this.type === "resistance"; }

        },
        sets: {
          type: Number,
          min: [0, 'Should be more then 0'],
          required: function () { return this.type === "resistance"; }
        },
        reps: {
          type: Number,
          min: [0, 'Should be more then 0'],
          required: function () { return this.type === "resistance"; }
        },
      }
    ]

}, { toJSON: { virtuals: true, } }
);

// setting virtual attribute of the workout duration 
WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration
  }, 0)
})
// exporting model
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;