import { GameFactory } from "./domains/game/factories/game.factory";
import { ShooterGame } from "./domains/game/entities/shooterGame.entity";
import { RaceGame } from "./domains/game/entities/raceGame.entity";
import { GameGenre } from "./domains/game/enums/game.enum";
import { SoulslikeGame } from "./domains/game/entities/soulslikeGame.entity";
import { Gamer } from "./domains/gamer/entities/gamer.entity";
import { Game } from "./domains/game/entities/game.entity";
import { Community } from "./domains/comunity/entities/comunity.enitity";


describe('Game',
         () => {
             let gameFactory: GameFactory;

             beforeEach(() => {
                 gameFactory = new GameFactory();
             });

             it('should create Soulslike game',
                () => {
                    const game = gameFactory.create(GameGenre.SOULS_LIKE,
                                                    {
                                                        name: 'Dark Souls',
                                                        year: 2011,
                                                    });
                    expect(game).toBeInstanceOf(SoulslikeGame);
                    expect(game.name).toBe('*Dark Souls*');
                    expect(game.year).toBe(2011);
                });

             it('should create Shooter game',
                () => {
                    const game = gameFactory.create(GameGenre.SHOOTER,
                                                    {
                                                        name: 'Call of Duty',
                                                        year: 2003,
                                                    });
                    expect(game).toBeInstanceOf(ShooterGame);
                    expect(game.name).toBe('*Call of Duty*');
                    expect(game.year).toBe(2003);
                });

             it('should create Race game',
                () => {
                    const game = gameFactory.create(GameGenre.RACE,
                                                    {
                                                        name: 'Need for Speed',
                                                        year: 1994,
                                                    });
                    expect(game).toBeInstanceOf(RaceGame);
                    expect(game.name).toBe('*Need for Speed*');
                    expect(game.year).toBe(1994);
                });

             it('should throw an error for invalid game genre',
                () => {
                    expect(() => {
                        gameFactory.create('INVALID_GENRE' as GameGenre,
                                           {
                                               name: 'Invalid Game',
                                               year: 2021,
                                           });
                    }).toThrowError('Invalid game genre');
                });

             it('should return game info',
                () => {
                    const game = gameFactory.create(GameGenre.SHOOTER,
                                                    {
                                                        name: 'Call of Duty',
                                                        year: 2003,
                                                    });
                    game.info();
                });
         });

describe('Gamer',
         () => {
             let gamer: Gamer;
             let game: Game;
             let gameFactory: GameFactory;

             beforeEach(() => {
                 gameFactory = new GameFactory();
                 gamer       = new Gamer({
                                             nickname: 'Player1',
                                             gender:   'Male',
                                         });

                 game = gameFactory.create(GameGenre.SHOOTER,
                                           {
                                               name: 'Call of Duty',
                                               year: 2003,
                                           });

                 gamer.addGame(game);
             });

             it('should add a game to gamer',
                () => {
                    expect(gamer.hasGame('*Call of Duty*')).toBeTruthy();
                });

             it('should remove a game from gamer',
                () => {
                    gamer.removeGame(game);
                    expect(gamer.hasGame('*Call of Duty*')).toBeFalsy();
                });
         });


describe('Community',
         () => {
             let community: Community;
             let gamers: Gamer[];

             beforeEach(() => {
                 // Example data for community initialization
                 gamers    = [
                     new Gamer({
                                   id:       '1',
                                   nickname: 'Player1',
                                   gender:   'Male',
                               }),
                     new Gamer({
                                   id:       '2',
                                   nickname: 'Player2',
                                   gender:   'Female',
                               }),
                 ];
                 community = new Community({gamers});
             });

             it('should initialize with gamers',
                () => {
                    expect(community.gamers).toEqual(gamers);
                });


             it('should add a gamer',
                () => {
                    const newGamer = new Gamer({
                                                   nickname: 'Player3',
                                                   gender:   'Male',
                                               });
                    community.addGamer(newGamer);
                    expect(community.gamers).toContain(newGamer);
                });

             it('should remove a gamer',
                () => {
                    const gamerToRemove = gamers[0];
                    community.removeGamer(gamerToRemove);
                    expect(community.gamers).not.toContain(gamerToRemove);
                });

             it('should list gamers',
                () => {
                    const consoleSpy = jest.spyOn(console,
                                                  'log');
                    community.listGamers();
                    expect(consoleSpy).toHaveBeenCalledWith('Gamers:',
                                                            JSON.stringify(gamers));
                    consoleSpy.mockRestore();
                });

             it('should throw error when trying to list gamers with less than 2 gamers', () => {
                    const community = new Community({gamers: []});
                    expect(() => community.listGamers()).toThrowError('Variable "gamers" is too short (min length is 2)');
             })

             it('should determine the popular game',
                () => {
                    // Add games to gamers for testing popularGame method
                    gamers[0].addGame({
                                          name: 'Call of Duty',
                                          year: 2003,
                                      });
                    gamers[0].addGame({
                                          name: 'FIFA 22',
                                          year: 2021,
                                      });
                    gamers[1].addGame({
                                          name: 'Call of Duty',
                                          year: 2003,
                                      });
                    community = new Community({gamers});

                    const consoleSpy = jest.spyOn(console,
                                                  'log');
                    community.popularGames();

                    expect(consoleSpy).toHaveBeenCalledWith('Popular games:',
                                                            ['Call of Duty', 'FIFA 22']);
                    consoleSpy.mockRestore();
                });
         });
