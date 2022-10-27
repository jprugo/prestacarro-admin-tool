import React from 'react';
import {
    Form,
    Button,
    DatePicker,
} from 'antd';

var fileDownload = require('js-file-download');


var axios = require('axios');

const Report1 = () => {

    const url = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_BASE_PATH;

    const onFormFinish = (data) => {

        let params = {
            startDate: data.startDate.format('YYYY-MM-DD'),
            endDate: data.endDate.format('YYYY-MM-DD'),
        }

        var config = {
            method: 'get',
            url: url + '/loans/download',
            params: params,
            responseType: 'blob',
            headers: {
                'Authorization': 'Bearer '
            }
        };

        axios(config)
            .then((response) => {

                const blob = new Blob([response.data]);

                /**
                 * , {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
                }
                 * **/

                fileDownload(blob, `loans.xlsx`);
            }
            )
            .catch(function (error) {
                alert(error);
            });
    };

    return (
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            /*onValuesChange={onFormLayoutChange}*/
            onFinish={onFormFinish}
        >
            <br></br>

            <Form.Item label="Fecha inicio" name="startDate" rules={[{ required: true, message: 'Ingrese fecha' }]}>
                <DatePicker placeholder='Fecha desde la que se buscaran prestamos' />
            </Form.Item>

            <Form.Item label="Fecha fin" name="endDate" rules={[{ required: true, message: 'Ingrese fecha' }]}>
                <DatePicker placeholder='Fecha hasta la que se buscaran prestamos' />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit">GENERAR REPORTE</Button>
            </Form.Item>
        </Form>
    );
};
export default Report1;