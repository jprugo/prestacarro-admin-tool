import { useEffect, React, useState } from 'react';

import { Table, Layout, Typography } from 'antd';

var axios = require('axios');

const {Paragraph} = Typography;

function Persons() {

    const url = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_BASE_PATH;

    const [persons, setPersons] = useState([]);

    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchDataFromBackend();
    }, []);

    const fetchDataFromBackend = (params) => {

        var config = {
            method: 'get',
            url: url + '/persons/all',
            params: params,
            headers: {
                'Authorization': 'Bearer '
            }
        };

        axios(config)
            .then(function (response) {
                if (response.status === 200){
                    console.log(response.data.page);
                    setPersons(response.data._embedded.personList);
                    setPage(response.data.page);
                }else if (response.status === 204){
                    console.log("No hay informacion de personas");
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const persons_colum = [
        {
            title: 'Nombre',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Numero de documento',
            dataIndex: 'documentNumber',
            key: 'documentNumber',
        }
    ]

    return (
        <Layout>

            {/*<Pagination defaultCurrent={page.number} total={page.totalElements} onChange={hanldePageChange} pageSize={page.size}*/}
            <Table
                    columns={persons_colum}
                    dataSource={
                        persons.map(function (person) {
                            return {
                                key: person.id,
                                fullName: person.fullName,
                                documentNumber: person.documentNumber
                            }
                        })
                    }
                    pagination={{
                        defaultPageSize: page.size, total: page.totalElements, onChange: (page, pageSize) => {
                            //console.log('page size : ' + pageSize);
                            fetchDataFromBackend({
                                pageNumber: page - 1
                            })
                        }
                    }}
                />


        </Layout>
    );
}

export default Persons;
