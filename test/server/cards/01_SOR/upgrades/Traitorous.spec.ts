describe('Traitorous', function() {
    integration(function(contextRef) {
        describe('Traitorous\'s ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: ['battlefield-marine'],
                        hand: ['traitorous']
                    },
                    player2: {
                        groundArena: ['specforce-soldier', 'wampa'],
                        spaceArena: ['cartel-spacer'],
                    }
                });
            });

            it('initiates an attack when played', function () {
                const { context } = contextRef;

                context.player1.clickCard(context.traitorous);
                expect(context.player1).toBeAbleToSelectExactly([context.battlefieldMarine, context.specforceSoldier, context.cartelSpacer, context.wampa]);
                context.player1.clickCard(context.cartelSpacer);

                expect(context.cartelSpacer).toBeInZone('spaceArena', context.player1);
            });
        });
    });
});
