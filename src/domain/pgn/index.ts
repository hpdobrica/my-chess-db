import { platform } from 'os';
import {parse} from 'pgn-parser';
import { Platform, Result } from '../games/entity';

import {createHash} from 'crypto';

export type GameData = {
    headers: {
        platform: Platform;
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
    pgn: string,
    hash: string
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

        if(!(Object.values(Result).includes(result.value))) {
            throw new Error(`invalid result while parsing pgn - ${result.value}`)
        }

        const platform = parsePlatform(game.headers)
        const date = game.headers.find((header) => header.name === 'Date');

        const timeControl = game.headers.find((header) => header.name === 'TimeControl');
        const termination = game.headers.find((header) => header.name === 'Termination');

        

        const headers = {
            black: black.value as string,
            white: white.value as string,
            result: result.value as Result,
            platform: platform,
            
            date: new Date(date.value),

            timeControl: timeControl.value as string,
            termination: termination.value as string
        }

        const moves = game.moves as GameData['moves']

        const gamePgn = getOnePgn(pgn, i);

        const hash = createHash('md5').update(gamePgn).digest('base64')

        return {
            moves,
            headers,
            pgn: gamePgn,
            hash
        }

    })

    return games;

}

function parsePlatform(rawHeaders: any[]): Platform {
    // 
    const site = rawHeaders.find((header) => header.name === 'Site').value as string;


    if(site === 'Chess.com') {
        return Platform.CHESS_COM
    }

    if(site.includes('lichess.org')) {
        return Platform.LICHESS
    }

    const mode = rawHeaders.find((header) => header.name === 'Mode') as string;

    if(mode.toUpperCase() === 'OTB') {
        return Platform.OTB
    }
    
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
            result+=`${row}\n`
        }
        if(count > index) {
            return;
        }
    });

    return result;
}