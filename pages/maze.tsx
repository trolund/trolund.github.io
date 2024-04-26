import { CSSProperties } from 'react'

interface MazeProps {

}

enum types {
    WALL,
    EMPTY,
    PLAYER
}

export default function Maze({ }: MazeProps) {

    const createMaze = (n: number): types[][] => {
        let maze: types[][] = new Array<Array<types>>();

        for (let y = 0; y <= n; y++) {
            let row: types[] = new Array<types>();
            for (let x = 0; x <= n; x++) {
                if (y !== n && x !== n) {
                    row.push(types.WALL);
                }
            }
            maze.push(row);
        }

        return maze;
    }

    const col = 50;
    let maze = createMaze(col);

    const cellStyle: CSSProperties = {
        textAlign: "center",
        verticalAlign: "baseline",
        backgroundColor: "red",
        border: "white solid 1px",
        overflow: "none",
        width: "15px",
        height: "15px",
        margin: "0px"
    }

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(" + col + ", minmax(0, 1fr))", maxHeight: "500px", maxWidth: "700px" }}>
            {maze.map((row, x) => row.map((t: types, y) => <div key={x + ":" + y} style={cellStyle}>{t}</div>))}
        </div>
    )
}
