import unittest
import mail_scheduler as ms
from datetime import datetime

class TestMailScheduler(unittest.TestCase):
    def setUp(self):
        self.deltas = [-5, 0, 2, 7]

    def test_days_to_next_run_returns_right_values(self):
        run_days = [0, 2, 5]
        self.assertEqual(ms.days_to_next_run(run_days, 0), 2)
        self.assertEqual(ms.days_to_next_run(run_days, 2), 3)
        self.assertEqual(ms.days_to_next_run(run_days, 3), 2)
        self.assertEqual(ms.days_to_next_run(run_days, 5), 2)

    def test_include_in_run_is_true_when_today_is_in_deltas(self):
        self.assertEqual(ms.include_in_run(2, 1, self.deltas), True)
        self.assertEqual(ms.include_in_run(-5, 7, self.deltas), True)
        self.assertEqual(ms.include_in_run(0, 3, self.deltas), True)

    def test_include_in_run_is_true_when_next_run_is_between_today_and_next_run(self):
        self.assertEqual(ms.include_in_run(9, 3, self.deltas), True)
        self.assertEqual(ms.include_in_run(1, 2, self.deltas), True)
        self.assertEqual(ms.include_in_run(-3, 4, self.deltas), True)

    def test_include_in_run_is_false(self):
        self.assertEqual(ms.include_in_run(10, 3, self.deltas), False)
        self.assertEqual(ms.include_in_run(-6, 1, self.deltas), False)
        self.assertEqual(ms.include_in_run(1, 1, self.deltas), False)
