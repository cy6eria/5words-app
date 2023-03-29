import { Input } from '../Input';
import { LETTERS } from '../../constants';

interface RowProps {
    rowIndex: number;
}

const cells = [...new Array(LETTERS)].map((_, index) => index);

export const Row = (props: RowProps) => {
    const { rowIndex } = props;

    return (
        <>
            {cells.map((colIndex) => (
                <Input
                    key={colIndex}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                />
            ))}
        </>
    );
}
