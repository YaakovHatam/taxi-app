import React, { useState } from 'react'
import { Button, Checkbox, Form, Radio } from 'semantic-ui-react'
import LocationArrow from './location-arrow';
import TaxiModal from './taxi-modal';

const getRoute = (source, dest) => fetch(`http://localhost:3300/${source}/${dest}`);

function TaxiPriceForm() {

    const [modalOpen, setModalOpen] = useState(false);

    const [formProps, setFormProps] = useState({
        time: '',
        date: '',
        from: '',
        to: '',
        airportSource: '1', // 1 - none, 2 - natbag, 3 - sde dov
        phoneOrder: false
    });
    const handleAirportChange = (e, data) => setFormProps({
        ...formProps,
        airportSource: data.value
    });

    const phoneOrderEvent = (e, data) => setFormProps({
        ...formProps,
        phoneOrder: data.checked
    });

    const onLocationReceived = (lat, lon) => setFormProps({
        ...formProps,
        from: lat.toFixed(5) + ',' + lon.toFixed(5)
    });

    const onDayTimeChange = (key, value) => setFormProps({
        ...formProps,
        [key]: value
    });

    const updateAddress = (key, value) => setFormProps({
        ...formProps,
        [key]: value
    });

    const calculate = () => {
        // setModalOpen(true);
        console.log(formProps);
        getRoute(formProps.from, formProps.to).then(res => console.log(res));
    }
    return (
        <>
            <TaxiModal headerText='a' content='d' open={modalOpen} />
            <Form>
                <Form.Input onChange={e => onDayTimeChange('time', e.target.value)} label='Time' placeholder='Time' />
                <Form.Input onChange={e => onDayTimeChange('date', e.target.value)} label='Day' placeholder='Day' />
                <Form.Group inline>
                    <Form.Input value={formProps.from} label='From' placeholder='From' />
                    <LocationArrow onLocationReceived={onLocationReceived} />
                </Form.Group>
                <Form.Input onChange={e => updateAddress('to', e.target.value)} label='To' placeholder='To' />
                <Form.Group inline>
                    <label>נתב״ג\שדה דב</label>
                    <Form.Field control={Radio}
                        label='לא שניהם' value='1'
                        checked={formProps.airportSource === '1'} onChange={handleAirportChange}
                    />
                    <Form.Field
                        control={Radio}
                        label='נתב״ג'
                        value='2'
                        checked={formProps.airportSource === '2'}
                        onChange={handleAirportChange}
                    />
                    <Form.Field
                        control={Radio}
                        label='שדה דב'
                        value='3'
                        checked={formProps.airportSource === '3'}
                        onChange={handleAirportChange}
                    />
                </Form.Group>
                <Form.Field onChange={phoneOrderEvent} control={Checkbox} label='הזמנה טלפונית' />
                <Form.Field onClick={calculate} control={Button}>Submit</Form.Field>
            </Form>
        </>
    )
}

export default TaxiPriceForm;