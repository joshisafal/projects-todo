import React from 'react';
import { Input, List, DatePicker } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
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
            content: e.target.value,
            date: null,
            dateString: ""
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

    setDate = (index, date, dateString) => {
      let newTodos = [...this.state.todos];
      newTodos[index].date = date;
      newTodos[index].dateString = dateString;

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
                        <TodoItem
                            todo = {item}
                            removeTodo = {this.removeTodo}
                            setDate = {this.setDate}
                        />
                    )}
                />
            </div>
        );
    }
}

class TodoItem extends React.Component {
    remove = () => {
      this.props.removeTodo(this.props.todo.index);
    };
   
    handleDateChange = ( date, dateString ) => {
      this.props.setDate(this.props.todo.index, date, dateString);
    }
  
    render() {
      return (
        <List.Item
          actions={[
            <DatePicker
              format = "DD/MM/YYYY"
              onChange = {this.handleDateChange}
              value = {this.props.todo.date}
            />,  
            <CloseCircleOutlined 
              theme="filled"
              onClick={this.remove}
            />
          ]}
        >
          {this.props.todo.content}
        </List.Item>
      );
    }
  }

