import { Topbar } from '../Topbar';
import { Row } from '../Row';
import { Keyboard } from '../Keyboard';
import { Button } from '../Button';
import { ResultDialog } from '../ResultDialog';
import { ROWS } from '../../constants';
import { newGame } from '../../events';
import './App.css';

const rows = [...new Array(ROWS)].map((_, index) => index);

export const App = () => {
    return (
        <>
            <div className="app">
                <Topbar />

                <div className="content">
                    <div className="board">
                        {rows.map((rowIndex) => (
                            <Row
                                key={rowIndex}
                                rowIndex={rowIndex}
                            />
                        ))}
                    </div>

                    <div>
                        <Keyboard />
                    </div>

                    <div>
                        <Button size="small" onClick={() => newGame()}>
                            Начать снова
                        </Button>
                    </div>
                </div>
            </div>

            <ResultDialog />
        </>
    )
}
