import React from 'react';
import { List } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

export default class TodoItem extends React.Component {
    remove = () => {
        this.props.removeTodo(this.props.todo.index);
    };
    render() {
        return(
            <List.Item
                actions={[
                    <CloseCircleOutlined 
                        onClick={this.remove}
                    />
                ]}
            >
                {this.props.todo.content}
            </List.Item>    
        );
    }
}
