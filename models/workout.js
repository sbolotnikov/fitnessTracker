const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
          unique: true
        },
        duration: {
          type: Number,

        },


        distance: {
          type: Number,
          required: function () { return this.type === "cardio"; }

        },


        weight: {
          type: Number,
          required: function () { return this.type === "resistance"; }

        },
        sets: {
          type: Number,
          required: function () { return this.type === "resistance"; }
        },
        reps: {
          type: Number,
          required: function () { return this.type === "resistance"; }
        },
      }
    ]

}, { toJSON: { virtuals: true, } }
);


WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration
  }, 0)
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;