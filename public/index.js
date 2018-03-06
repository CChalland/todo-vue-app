/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      welcome: "Welcome to your tasks",
      tasks: [
        { id: 1, text: "Welcome to task 1", completed: false },
        { id: 2, text: "Welcome to taks 2", completed: false },
        { id: 3, text: "Welcome to task 3", completed: false }
      ],
      task: { id: null, text: "", completed: false },
      chngeTask: { id: null, text: "", completed: false }
    };
  },
  mounted: function() {
    axios.get("/v1/tasks").then(
      function(response) {
        this.tasks = response.data;
      }.bind(this)
    );
  },
  methods: {
    addTask: function() {
      var newTask = {
        id: this.tasks.length + 1,
        text: this.task.text,
        completed: false
      };
      axios
        .post("/v1/tasks", {
          text: newTask.text,
          completed: false
        })
        .then(function(response) {
          console.log(response);
        });
      this.tasks.push(newTask);
      this.task.text = "";
    },
    changeTask: function() {
      var changedTask = {
        id: this.chngeTask.id,
        text: this.chngeTask.text
      };
      axios
        .patch(`/v1/tasks/${changedTask.id}`, {
          text: changedTask.text
        })
        .then(function(response) {
          console.log(response);
        });
    },
    incompleteTasks: function() {
      var counter = 0;
      this.tasks.forEach(function(task) {
        if (task.completed === false) {
          counter += 1;
        }
      });
      return counter;
    },
    toggleCompleted: function(inputTask) {
      inputTask.completed = !inputTask.completed;
    },
    deleteAllTasks: function() {
      this.tasks.splice(0, this.tasks.length);
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }]
});

var app = new Vue({
  el: "#app",
  router: router
});
