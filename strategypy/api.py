import logging


class BaseBot(object):
    """
    Base class for all the bots.
    """
    def __init__(self, ctx):
        self.__allowed_actions__ = [
            'move up',
            'move left',
            'move right',
            'move down',
        ]

        self.__static_data__ = ctx

    def action(self, ctx):
        """
        To be implented in the super class.
        It is supposed to return one of the action defined
        in __allowed_actions__.
        ctx contains all the available data in the game:
            (int) player_pk
            (int) pk
            (bool) respawn
            (int, int) grid_size
            (int, int) position
            (list) has_killed
            (list) was_killed_by
            (dict) current_data

        """

        raise NotImplementedError

    def __process_action__(self, ctx):
        """
        Interpret the message returned by action and execute it
        """
        action = self.action(ctx)

        if action not in self.__allowed_actions__:
            if action is not None:
                msg = 'Bot#%s executing not allowed action: %s' % (
                    self.static_data['player_pk'], action)
                logging.warning(msg)
            return

        verb, arg = action.split(' ')

        return arg
