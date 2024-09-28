let goalCalories = 2360;
let foodCalories = 0;
let exerciseCalories = 0;

document.getElementById('addExerciseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const caloriesBurned = parseInt(formData.get('caloriesBurned'));
    exerciseCalories += caloriesBurned;
    updateCalorieInfo();
    document.getElementById('exercise-form').style.display = 'none';
});

document.getElementById('addFoodForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const caloriesConsumed = parseInt(formData.get('caloriesConsumed'));
    foodCalories += caloriesConsumed;
    updateCalorieInfo();
    document.getElementById('food-form').style.display = 'none';
});

function showExerciseForm() {
    document.getElementById('exercise-form').style.display = 'block';
}

function showFoodForm() {
    document.getElementById('food-form').style.display = 'block';
}

function updateCalorieInfo() {
    goalCalories = parseInt(document.getElementById('calories-goal').value);
    const remainingCalories = parseInt(document.getElementById('calories-remaining').value);

    const netCalories = foodCalories - exerciseCalories;
    const displayNetCalories = goalCalories - netCalories;

    document.getElementById('calories-food').innerText = `${foodCalories} FOOD`;
    document.getElementById('calories-exercise').innerText = `${exerciseCalories} EXERCISE`;
    document.getElementById('calories-net').innerText = `${netCalories} NET`;
}
