describe('Finalizer, Might of the First Order', function() {
    integration(function(contextRef) {
        describe('Finalizer\'s when played ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['finalizer#might-of-the-first-order'],
                        groundArena: ['wampa', 'battlefield-marine'],
                    },
                    player2: {
                        groundArena: ['atst', 'snowspeeder']
                    }
                });
            });

            it('should give an experience token to a unit', function () {
                const { context } = contextRef;

                context.player1.clickCard(context.finalizer);
                expect(context.player1).toBeAbleToSelectExactly([context.wampa, context.battlefieldMarine]);
                expect(context.player1).toHavePassAbilityButton();

                context.player1.clickCard(context.wampa);
                context.player1.clickCard(context.battlefieldMarine);
                context.player1.clickPrompt('Done');

                expect(context.player1).toBeAbleToSelect([context.atst, context.snowspeeder]);
            });
        });
    });
});
