import { useEffect, React, useState } from 'react';

import { Table, Layout, Typography, Button } from 'antd';

import { UnlockOutlined, LockOutlined } from '@ant-design/icons'

const { Paragraph } = Typography;

var axios = require('axios');

function App() {

    const url = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_BASE_PATH;

    const [actives, setActives] = useState([]);

    useEffect(() => {
        fetchDataFromBackend();
    }, []);

    function changeActiveState(url) {
        var config = {
            method: 'put',
            url: url,
            headers: {
                'Authorization': 'Bearer '
            }
        };

        console.log("making request to :"+ url);

        axios(config)
            .then(function (response) {
                const data = response.data;
                
                fetchDataFromBackend();

                /*
                let tempArray = [...actives];
                let index = tempArray.findIndex(active => active.id === data.id);
                let object = tempArray[index];
                tempArray[index] = { ...object, ...response.data };
                
                setActives(tempArray);*/

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const fetchDataFromBackend = () => {

        var config = {
            method: 'get',
            url: url + '/actives/',
            headers: {
                'Authorization': 'Bearer '
            }
        };

        axios(config)
            .then(function (response) {

                if(response.status === 200){
                    setActives(response.data);
                }else if (response.status === 204){
                    console.log("No hay informacion de activos");
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const actives_colum = [
        {
            title: 'Codigo Interno',
            dataIndex: 'internalCode',
            key: 'internalCode',
        },
        {
            title: 'Fecha de registro',
            dataIndex: 'registrationDate',
            key: 'registrationDate',
        },
        {
            title: 'Deshabilitado',
            dataIndex: 'disabled',
            key: 'disabled',
            render: value => <Paragraph style={{ margin: 0, color: value ? 'grey' : 'blue' }}>{value ? 'Si' : 'No'}</Paragraph>,
        },
        {
            title: 'enlaces',
            dataIndex: 'links',
            key: 'links',
            render: (links, element) => (
                <>
                    {links.filter(link => link.rel !== 'self').map(link => {
                        return (
                            <Button
                                type="primary" shape="round" icon={element.disabled ? <UnlockOutlined /> : <LockOutlined />}
                                size={22} onClick={() => changeActiveState(link.href)}
                                style={{ backgroundColor: element.disabled ? 'grey' : 'blue' }}
                            >
                                {element.disabled ? 'Enable' : 'Disable'}
                            </Button>
                        );
                    })}
                </>
            ),
        }
    ]


    return (
        <Layout>
            <Table
                columns={actives_colum}
                dataSource={
                    actives.map(function (active) {
                        return {
                            key: active.id,
                            internalCode: active.internalCode,
                            registrationDate: active.registrationDate,
                            disabled: active.disabled,
                            links: active.links
                        }

                    })
                }
            />
        </Layout>
    );
}

export default App;