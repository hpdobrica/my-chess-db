import {parse} from 'pgn-parser';
import { Result } from '../games/entity';

type GameData = {
    headers: {
        platform: string;
        black: string;
        white: string;
        result: Result;
        timeControl: string;
        date: Date;
        termination: string;
    }
    moves: [
        {
            move: string;
            move_number?: number;
            nags?: string;
        }
    ],
    pgn: string
}

export const parseGames = (pgn: string): GameData[] => {

    const results = parse(pgn) as any[];

    if(!results.length) {
        throw new Error('Error while parsing pgn, no games found');
    }


    const games = results.map((game, i) => {



        const black = game.headers.find((header) => header.name === 'Black');
        const white = game.headers.find((header) => header.name === 'White');

        const result = game.headers.find((header) => header.name === 'Result');

        if(!(result in Result)) {
            throw new Error('invalid result while parsing pgn')
        }

        const platform = game.headers.find((header) => header.name === 'Site');

        const date = game.headers.find((header) => header.name === 'Date');

        const timeControl = game.headers.find((header) => header.name === 'TimeControl');
        const termination = game.headers.find((header) => header.name === 'Termination');

        

        const headers = {
            black: black.value as string,
            white: white.value as string,
            result: result.value as Result,
            platform: platform.value as string,
            
            date: new Date(date.value),

            timeControl: timeControl.value as string,
            termination: termination.value as string
        }

        const moves = game.moves as GameData['moves']

        const gamePgn = getOnePgn(pgn, i);
        return {
            moves,
            headers,
            pgn: gamePgn
        }

    })

    return games;

}


function getOnePgn(pgn: string, index: number): string {
    const pgnRows = pgn.split('\n')

    let count = 0;
    let part = 'headers'
    let result = ''

    pgnRows.forEach((row) => {
        if(row == '' && part == 'headers'){
            part = 'moves'
            if(count == index) {
                result +='\n'
            }
            return;
        }
        if(row == '' && part == 'moves'){
            part = 'headers'
            count+=1
            return;
        }
        if(count == index) {
            console.log('3')
            result+=`${row}\n`
        }
        if(count > index) {
            return;
        }
    });

    return result;
}