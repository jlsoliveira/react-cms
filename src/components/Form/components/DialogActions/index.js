import React, { Fragment } from "react";
import { 
    Button,
    DialogActions as DialogActionsMUI, 
} from "@material-ui/core"

import './style.css';

const DialogActions = ({status, handleClose, handleSubmit}) => {
    return (
        <DialogActionsMUI>
            { status === 'success' ? 
                <Button onClick={handleClose} color="primary">
                Fechar
                </Button>
            :
                <Fragment>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Salvar
                    </Button>
                </Fragment>
            }
        </DialogActionsMUI>
    )
}

export default DialogActions