
$(function() {
    Backbone.emulateHTTP = true;

    var template = function (id) {
        return _.template($('#' + id).html());
    };

    var Task_model = Backbone.Model.extend({

        defaults: function () {
            return {
                task_text: "new task",
                id: this.cid,
                done: false,
                hide: false,
                visible: true
            };
        },

        initialize: function () {
            if (!this.get("task_text")) {
                this.set({task_text: this.defaults.task_text});
            }
        },

        remove: function () {
            console.log(this.get('id'));
            this.destroy();
        },

        taskStatus: function () {
            this.save({done: !this.get('done')})
        },

        hide: function () {
            if (!this.get('hide'))
                this.save({hide: true});
        },
        show: function () {
            if (!this.get('visible'))
                this.save({visible: true});
        }

    });


    var TodoList_collection = Backbone.Collection.extend({

        model: Task_model,

       // localStorage: new Store("todosList-backbone"),

        url: '/todo/update',


        done: function () {
            return this.filter(function (task) {
                return task.get("done");
            });
        },

        undone: function () {
            return this.filter(function (task) {
                return !task.get("done");
            });
        },

        hidden: function () {
            return this.filter(function (task) {
                return task.get("hide");
            });
        },

        shown: function () {
            return this.filter(function (task) {
                return task.get("visible");
            });
        },

        send_to_server: function () {
            Backbone.sync('update', this);
        }

});

    var todoList = new TodoList_collection();

    var Task_view = Backbone.View.extend({

        tagName: "li",

        template: template('task_template'),


        initialize: function () {
            this.model.bind('destroy', this.remove, this);
            this.model.bind('change:hide', this.hide_task, this);
            this.model.bind('change:visible', this.show_task, this);
            this.model.bind('change', this.render, this);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get("done"));
            this.input = this.$('.edit');
            return this;
        },

        events: {
            "click .taskStatus": "changeStatus",
            "click .delTask": "delete_task",
            "dblclick .singleTask": "edit_task",
            "blur .edit": "remove_changing",
            "keypress .edit": "change_task"
        },

        changeStatus: function () {
            this.model.taskStatus();
        },

        delete_task: function () {
            this.model.remove();
        },

        edit_task: function () {
            this.$el.addClass("changing");
            this.input.focus();
        },

        remove_changing: function () {
            var val = this.input.val();
            var start_val = this.model.get('task_text');
            if (val.trim())
                this.model.save({task_text: val});
            else
                this.input.val(start_val);
            this.$el.removeClass('changing');
        },

        change_task: function (e) {
            var key = (e.which || e.keyCode);
            if (key == 13)
                this.remove_changing();
            todoList.send_to_server();
        },

        hide_task: function () {
            console.log('just hidden');
            this.$el.addClass("hidden");
        },

        show_task: function () {
            console.log('just shown');
            this.$el.removeClass("hidden");
        }

    });

    var TodoList_view = Backbone.View.extend({
        el: $('.container'),

        initialize: function () {
            this.inputField = this.$('#newTask');
            this.allStatus = this.$('#checkAll')[0];
            this.left_tasks = this.$('#leftTasks');
            this.buttons = {
                button_all: this.$('.all'),
                button_current: this.$('.current'),
                button_done: this.$('.done'),
                button_clear: this.$('.clear')
            };

            todoList.bind('add', this.add_single_task, this);
            todoList.bind('reset', this.add_all_tasks, this);
            todoList.bind('all', this.render, this);
            todoList.fetch();
        },

        add_single_task: function (newTask) {
            var task = new Task_view({model: newTask});
            this.$('#tasksField').append(task.render().el);
        },

        add_all_tasks: function () {
            todoList.each(this.add_single_task());
        },

        render: function () {
            this.left_tasks.text(todoList.undone().length);
            if (todoList.undone().length)
                this.allStatus.checked = false;
            else
                this.allStatus.checked = true;
        },

        events: {
            "click #checkAll": "all_change_status",
            "keypress #newTask": "add_new_task",
            "click .clear": "del_done",
            "click .done": "show_done",
            "click .all": "show_all",
            "click .current": "show_current"
        },

        all_change_status: function () {
            var status = this.allStatus.checked;
            todoList.each(function (task) {
                task.save({'done': status})
            });
        },

        add_new_task: function (e) {
            var key = (e.which || e.keyCode);
            if (key == 13) {
                var newTask = this.inputField.val();
                if (newTask.trim()) {
                    todoList.create({task_text: newTask});
                    this.inputField.val('');
                }
            }
        },

        del_done: function () {
            this.set_active_button(this.buttons.button_clear);
            _.each(todoList.done(), function (task) {
                task.remove();
            });

            return false;
        },

        show_done: function () {
            this.set_active_button(this.buttons.button_done);
            _.each(todoList.done(), function (task) {
                task.show();
            });
            _.each(todoList.undone(), function (task) {
                task.hide();
            });
        },

        show_current: function () {
            this.set_active_button(this.buttons.button_current);
            _.each(todoList.undone(), function (task) {
                task.show();
            });
            _.each(todoList.done(), function (task) {
                task.hide();
            });
        },

        show_all: function () {
            this.set_active_button(this.buttons.button_all);
            _.each(todoList.undone(), function (task) {
                task.show();
            });
            _.each(todoList.done(), function (task) {
                task.show();
            });
        },

        set_active_button: function (button) {
            for (var i in this.buttons) {
                this.buttons[i].removeClass('active');
            }
            button.addClass('active');
        }
    });

    var todoApp = new TodoList_view();

});