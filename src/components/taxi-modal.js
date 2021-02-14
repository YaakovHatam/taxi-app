import React, { useEffect } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function TaxiModal(props) {
    const [open, setOpen] = React.useState(props.open);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const modalAction = (e) => {
        setOpen(false);
        props.onModalClose(e)
    }

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'>

            <Header icon>
                <Icon name='archive' />
                {props.headerText}
            </Header>
            <Modal.Content>
                <p>{props.content}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => modalAction(false)}>
                    <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={() => modalAction(true)}>
                    <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default TaxiModal;