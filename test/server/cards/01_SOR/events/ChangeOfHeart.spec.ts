describe('Change of Heart', function() {
    integration(function(contextRef) {
        describe('Change of Heart\'s ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['change-of-heart'],
                        spaceArena: ['cartel-spacer']
                    },
                    player2: {
                        groundArena: [{ card: 'battlefield-marine', owner: 'player1' }, 'wampa']
                    }
                });
            });

            it('takes control and will return non-leader unit to owner\'s control', function () {
                const { context } = contextRef;
                context.player1.clickCard(context.changeOfHeart);
                expect(context.player1).toBeAbleToSelectExactly([context.cartelSpacer, context.battlefieldMarine, context.wampa]);
                context.player1.clickCard(context.wampa);
                expect(context.wampa).toBeInZone('groundArena', context.player1);

                // Check that Wampa returns to player 2
                context.moveToRegroupPhase();
                expect(context.wampa).toBeInZone('groundArena', context.player2);
                expect(context.player1).toHavePrompt('Select between 0 and 1 cards to resource');
            });

            it('takes control and will return non-leader unit to owner\'s control', function () {
                const { context } = contextRef;
                context.player1.clickCard(context.changeOfHeart);
                expect(context.player1).toBeAbleToSelectExactly([context.cartelSpacer, context.battlefieldMarine, context.wampa]);
                context.player1.clickCard(context.battlefieldMarine);
                expect(context.battlefieldMarine).toBeInZone('groundArena', context.player1);

                // Check that Battlefield Marine stays with player1 since p1 is the owner
                context.moveToRegroupPhase();
                expect(context.battlefieldMarine).toBeInZone('groundArena', context.player1);
                expect(context.player1).toHavePrompt('Select between 0 and 1 cards to resource');
            });
        });
    });
});
