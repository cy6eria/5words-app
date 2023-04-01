import { Topbar } from '../Topbar';
import { Row } from '../Row';
import { Actions } from '../Actions';
import { Keyboard } from '../Keyboard';
import { ResultDialog } from '../ResultDialog';
import { ROWS } from '../../constants';
import './App.css';

const rows = [...new Array(ROWS)].map((_, index) => index);

export const App = () => {
    return (
        <>
            <div className="app">
                <Topbar />

                <ResultDialog />

                <div className="content">
                    <div className="board">
                        {rows.map((rowIndex) => (
                            <Row
                                key={rowIndex}
                                rowIndex={rowIndex}
                            />
                        ))}
                    </div>

                    <Actions className="actions" />

                    <div>
                        <Keyboard />
                    </div>
                </div>
            </div>
        </>
    )
}
