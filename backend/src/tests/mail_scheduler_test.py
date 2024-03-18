import unittest
import mail_scheduler as ms
from datetime import datetime

class TestMailScheduler(unittest.TestCase):
    def setUp(self):
        self.deltas = [0, 2, 5]
    
    def test_days_to_next_run_returns_right_values(self):
        self.assertEqual(ms.days_to_next_run(self.deltas, 0), 2)
        self.assertEqual(ms.days_to_next_run(self.deltas, 2), 3)
        self.assertEqual(ms.days_to_next_run(self.deltas, 3), 2)
        self.assertEqual(ms.days_to_next_run(self.deltas, 5), 2)