import React, { Component } from 'react'
import BeatLoader from 'react-spinners/BeatLoader';
import Modal from 'react-modal'

let json = []

Modal.setAppElement('#root')

class Main extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            showModal: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    async componentDidMount() {
        try {
            const response = await fetch('https://watchlater.cloud.technokratos.com/get/array');
            json = await response.json();
            this.setState({ loading: false });
            document.body.style.backgroundColor = '#E5E5E5';
        } catch (error) {
            alert('yo something went wrong check console')
            console.log(error);
        }
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = '#FFFFFF'
    }

    render() {

        if (this.state.loading) {
            return <BeatLoader color='#6979F8' loading={this.state.loading} margin={20} size={15} />;
        }

        function calculateDate(date) {
            let dt = new Date(date);
            let dd = dt.getDate();
            let mm = dt.getMonth() + 1;
            let yyyy = dt.getFullYear();
            return dd + '.' + mm + '.' + yyyy + '.';
        }

        return (
            <div id="blocks">
                {
                    json.map((data, key) => {
                        return (
                            <div>
                                <ul id='block' key={key} onClick={this.handleOpenModal}>
                                    <li className='avatar'><img src='https://thispersondoesnotexist.com/image' alt='userpic' height='80' width='80' /></li>
                                    <li className='name'>{data.fname} {data.name[0]}. {data.mname[0]}.</li>
                                    <li className='balance'>Баланс: {data.balance.toFixed(2)}</li>
                                    <li>Последнее изменение: {calculateDate(data.lastUpdatedAt)}</li>
                                    <li>
                                        <select defaultValue={data.status}>
                                            <option disabled value='0'>Приостановлена</option>
                                            <option disabled value='1'>Подписка активна</option>
                                            <option disabled value='2'>Заблокирован</option>
                                        </select>
                                    </li>
                                </ul>
                                <Modal
                                    isOpen={this.state.showModal}
                                >
                                    <ul id='modal'>
                                        <li className='name'>{data.fname} {data.name} {data.mname}</li>
                                        <li>
                                            <select defaultValue={data.status}>
                                                <option disabled value='0'>Приостановлена</option>
                                                <option disabled value='1'>Подписка активна</option>
                                                <option disabled value='2'>Заблокирован</option>
                                            </select>
                                        </li>
                                    </ul>
                                    <button onClick={this.handleCloseModal}>Закрыть</button>
                                </Modal>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Main;