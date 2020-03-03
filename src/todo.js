import React from 'react';
import { Input, List } from 'antd';
import "antd/dist/antd.css";

export default class Todo extends React.Component {
    constructor () {
        super();

        this.state = {
            todos: []
        };
    }

    handlePressEnter = e => {
        const todo = {
            index: this.state.todos.length,
            content: e.target.value
        };
        const newTodos = this.state.todos.concat(todo);

        this.setState({
            todos: newTodos
        });

        e.target.value = "";
    };

    removeTodo = index => {
        let newTodos = [...this.state.todos];

        newTodos.splice(index, 1);

        for (let i = index; i < newTodos.length; i++) {
            newTodos[i].index -= 1;
          }
        
        this.setState({
            todos: newTodos
        });
    };

    render() {
        return (
            <div className="todoContainer">
                <h1>TODO App</h1>

                <Input 
                    placeholder="What needs to be done"
                    onPressEnter={this.handlePressEnter}
                />    
                <List 
                    locale={{ emptyText: "No Todo items" }}
                    dataSource={this.state.todos}
                    renderItem={item => (
                        <List.Item
                            todo = {item}
                            removeTodo = {this.removeTodo}
                        />
                    )}
                />
            </div>
        );
    }
}

