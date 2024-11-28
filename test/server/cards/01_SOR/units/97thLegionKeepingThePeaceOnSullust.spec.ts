describe('97th Legion Keeping the Peace on Sullust', function() {
    integration(function(contextRef) {
        describe('97th Legion\'s ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: ['97th-legion#keeping-the-peace-on-sullust'],
                        resources: 7
                    },
                });
            });

            it('should give +1/+1 for each resource of the controller', function () {
                const { context } = contextRef;

                expect(context._97thLegion.getPower()).toBe(7);
                expect(context._97thLegion.getHp()).toBe(7);

                context.player1.clickCard(context._97thLegion);
                expect(context.p2Base.damage).toBe(7);

                expect(context.player2).toBeActivePlayer();
            });
        });
    });
});
