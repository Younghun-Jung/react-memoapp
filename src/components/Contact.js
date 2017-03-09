import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [
                {
                    name: "Abet",
                    phone: '111-000-0001'
                },{
                    name: "Betty",
                    phone: '222-000-0002'
                },{
                    name: "Chalie",
                    phone: '333-000-0003'
                },{
                    name: "Denis",
                    phone: '444-000-0004'
                },{
                    name: "Elly",
                    phone: '555-000-0005'
                }
            ]
        };
        // binding handler and this obj
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }
    handleClick(key) {
        this.setState({
            selectedKey: key
        });
        console.log(key, 'is selected');
    }

    render() {
        const mapToComponent = (data) => {
            data.sort((a, b) => {
                return a.name > b.name;
            });
            // 검색 필터
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
                }
            )
            return data.map((contact, i) => {
                return (
                    <ContactInfo
                        contact={contact}
                        key={i}
                        onClick={()=>this.handleClick(i)} // 컴포넌트에는 적용안되며 해당 컴포넌트의 props로 넘겨서 사용. 바로 사용하는 것이 아니라 arrow function 사용해서 클릭되면 실행되도록
                    />
                );
            });
        }

        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search..."
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponent(this.state.contactData)}</div>
                <ContactDetails
                    isSelected={this.state.selectedKey != -1} // 선택되면 true 전달
                    contact={this.state.contactData[this.state.selectedKey]} // 선택된 인덱스에 해당하는 주소 반영
                />
            </div>
        );
    }
}
